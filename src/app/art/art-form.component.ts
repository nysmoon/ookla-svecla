import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import * as firebase from 'firebase/app';
// import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ArtService } from './art.service'
import { TagService } from '../tags/tags.service'

@Component({
	selector: 'os-art-form',
	templateUrl: './art-form.component.html'
})

export class ArtFormComponent implements OnInit {

	public art_id: string;

	public artForm: FormGroup;
	public artTagsFormArray: FormArray;
	public artTagsArray: number[] = [];

	public image_url;
	private art_url;
	private artFileStorage; 

	public artTags = [];

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

		this.artTagsFormArray = this.formBuilder.array([]);

		this.artForm = this.formBuilder.group({
			'art-name': ['', Validators.required],
			'art-description': ['', Validators.required],
			'art-date': ['', Validators.required],
			'art-file': ['', Validators.required],
			'tags': this.artTagsFormArray
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

					this.artTags = art['tags']

				})
		}

	}

	suggestArtTags(event) {

		let query = event.query;

		this.tagService.getTags().subscribe(
			(tags) => {
				console.log(tags)
				this.artTagsSuggestions = this.filterArtTags(query, tags);
			})
	}

	filterArtTags(query, artTags: any[]):any[] {
		let filtered : any[] = [];
		for(let i = 0; i < artTags.length; i++) {
			let artTag = artTags[i];
			// if(artTag['tag-name'].toLowerCase().indexOf(query.toLowerCase()) == 0 && this.artTagsArray.indexOf(artTag.id) == -1) {
				if(artTag['tag-name'].toLowerCase().indexOf(query.toLowerCase()) == 0) {
					filtered.push(artTag);
				}
			}
			return filtered;
		}

		cancelAddTag(new_tag_input) {
			new_tag_input.value = '';
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

			this.artTags.forEach(
				(tag) => {
					let tag_control = this.formBuilder.control(tag)

					this.artTagsFormArray.push(tag_control);

				})

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

									this.artService.getArtById(this.art_id).update(this.artForm.value)

								} else {
									this.artService.artsCollection.add(this.artForm.value)

								}


							})
					})
			} else {

				this.artService.getArtById(this.art_id).update(this.artForm.value)

			}



			this.image_url = '';
			this.router.navigate(['/art'])

		}

		showForm() {
			console.log(this.artForm.value)
		}

	}