import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ArtService } from './art.service'

@Component({
	selector: 'os-art-add-edit',
	templateUrl: './art-add-edit.component.html'
})

export class ArtAddEditComponent implements OnInit {

	@Input() art;

	public artForm: FormGroup;
	public artTagsForm: FormArray;

	public image_url;
	private art_url;
	public artTags;

	artTagsSuggestions: any[];

	constructor(private formBuilder: FormBuilder, 
		public activeModal: NgbActiveModal,
		private artService: ArtService) {}

	ngOnInit() {

		this.artForm = this.formBuilder.group({
			'art-name': ['', Validators.required],
			'art-description': ['', Validators.required],
			'art-tags': this.artTagsForm,
			'art-date': ['', Validators.required],
			'art-file': ['', Validators.required],
		})

		this.artTagsForm = this.formBuilder.array([])

	}

	suggestArtTags(event) {

		let query = event.query;

		this.artService.getArtTags().then(
			artTags => {
				this.artTagsSuggestions = this.filterArtTags(query, artTags);
			});
	}

	filterArtTags(query, artTags: any[]):any[] {
		let filtered : any[] = [];
		for(let i = 0; i < artTags.length; i++) {
			let artTag = artTags[i];
			if(artTag.name.toLowerCase().indexOf(query.toLowerCase()) == 0 && this.artTagsForm.value.indexOf(artTag.id) == -1) {
				filtered.push(artTag);
			}
		}
		return filtered;
	}

	onTagSelect(tag) {
		console.log(tag)
		this.artTagsForm.push(new FormControl(tag.id))

		console.log(this.artTagsForm.value)
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

	onTagsUpdate(event) {
		console.log(event.target.value)
	}

	onSubmit() {
		console.log(this.artForm.get('art-tags').value);

		// let storageRef = firebase.storage().ref('arts/' + this.art_url.name);

		// storageRef.put(this.art_url).on('state_changed',
		// 	(snapshot) => {
		// 	},
		// 	(error) => {
		// 		console.log(error)
		// 	},
		// 	() => {
		// 		storageRef.getDownloadURL().then(
		// 			(url) => {
		// 				this.artForm.get('art-file').setValue(url);
		// 				console.log(this.artForm.value)
		// 			})
		// 	})

		// this.image_url = '';

	}
}