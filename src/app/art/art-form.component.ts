import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import * as firebase from 'firebase/app';
// import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ArtService } from './art.service'
import { TagService } from '../tags/tags.service'

import { ISubscription } from "rxjs/Subscription";

@Component({
	selector: 'os-art-form',
	templateUrl: './art-form.component.html'
})

export class ArtFormComponent implements OnInit {

	public art_id: string;

	public artForm: FormGroup;

	public image_url;
	private art_url;
	private artFileStorage; 

	private tagsByArt: string[] = [];
	public artTags = [];
	public artTagsSelected: Object[] = [];

	private artTagsToRemove: Object[];
	private subscriptions: ISubscription[] = [];

	artTagsSuggestions: any[];

	constructor(private formBuilder: FormBuilder, 
		// public activeModal: NgbActiveModal,
		private artService: ArtService,
		private tagService: TagService,
		private router: Router,
		private activatedRoute: ActivatedRoute) {
		this.art_id = this.activatedRoute.snapshot.paramMap.get('id')
	}

	ngOnInit() {

		this.subscriptions.map(subscription => {
			subscription.unsubscribe()
		})

		this.artTagsToRemove = [];

		this.artForm = this.formBuilder.group({
			'art-name': ['', Validators.required],
			'art-description': ['', Validators.required],
			'art-date': ['', Validators.required],
			'art-file': ['', Validators.required]
		});

		if (this.art_id) {

			let art_doc = this.artService.getArtById(this.art_id)
			art_doc.valueChanges().subscribe(
				(art) => {

					this.artForm.patchValue({
						'art-name': art['art-name'],
						'art-description': art['art-description'],
						'art-date': art['art-date'],
						'art-file': art['art-file']
					});

					this.image_url = art['art-file'];

					
				})

			this.artTags = this.tagService.getTagsByArt(this.art_id);

			this.tagsByArt.map(tag_by_art => {
				this.tagService.getTagById(tag_by_art).map(tag => {
					this.artTags.push(tag)
					console.log(tag)
				})

			})
		}
	}
	suggestArtTags(event) {

		let query = event.query;

		this.subscriptions.push(this.tagService.getTags().subscribe(
			(tags) => {
				this.artTagsSuggestions = this.filterArtTags(query, tags);
			}))
	}

	filterArtTags(query, artTags: any[]):any[] {
		let filtered : any[] = [];
		for(let i = 0; i < artTags.length; i++) {
			let artTag = artTags[i];
			if(artTag['tag-name'].toLowerCase().indexOf(query.toLowerCase()) == 0 && this.artTagsSelected.indexOf(artTag.id) == -1) {
				filtered.push(artTag);
			}
		}
		return filtered;
	}

	onTagSelect(selected_tag) {
		this.artTagsSelected.push(selected_tag)

	}

	onTagUnselect(unselected_tag) {
		this.artTagsSelected.filter(
			(tag) => {
				return tag['id'] !== unselected_tag['id']
			})

		this.artTagsToRemove.push(unselected_tag)
	}


	onFileUpload(event) {

		if(event.target.files && event.target.files.length > 0) {

			this.art_url = event.target.files[0];

			var reader = new FileReader();

			reader.onload = (event:any) => {
				this.image_url = event.target.result;
			}

			reader.readAsDataURL(event.target.files[0]);



		}
	}

	onSubmit() {

		if (this.art_url) {	

			this.artFileStorage = firebase.storage().ref('arts/' + this.art_url.name);
			this.artFileStorage.put(this.art_url).on('state_changed',
				(snapshot) => {
				},
				(error) => {
					console.log(error)
				},
				() => {
					this.artFileStorage.getDownloadURL().then(
						(url) => {

							this.artForm.get('art-file').setValue(url);

							if (this.art_id) {

								this.updateArt()

							} else {

								this.artService.addArt(this.artForm.value, this.artTags)
								this.onClose()

							}


						})
				})

		} else {

			this.updateArt()
		}

		this.image_url = '';
		this.router.navigate(['/art'])

	}

	updateArt() {

		this.artTagsToRemove.map(tag => {
			this.artService.removeTag(this.art_id, tag['tag_id'])

		})

		this.artService.addArtTag(this.art_id, this.artTagsSelected)

		this.artService.getArtById(this.art_id).update(this.artForm.value)

		this.onClose()

	}

	showForm() {
		console.log(this.artForm.value)
	}

	onClose() {
		this.artTagsSelected = [];
		this.artTagsToRemove = [];
		this.artTags = [];
		this.subscriptions.map(subscription => {
			subscription.unsubscribe()
		})
	}

	ngOnDestroy() {

		this.subscriptions.map(subscription => {
			subscription.unsubscribe()
		})
	}

}