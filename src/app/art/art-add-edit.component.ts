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

	public artTags;
	artTagsSuggestions: any[];

	constructor(private formBuilder: FormBuilder, 
		public activeModal: NgbActiveModal,
		private artService: ArtService) {}

	suggestArtTags(event) {

		let query = event.query;

		this.artService.getArtTags().then(
			artTags => {
				this.artTagsSuggestions = this.filterArtTags(query, artTags);
				console.log(this.artTagsSuggestions)
			});
	}

	filterArtTags(query, artTags: any[]):any[] {
		let filtered : any[] = [];
		for(let i = 0; i < artTags.length; i++) {
			let artTag = artTags[i];
			if(artTag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
				filtered.push(artTag);
			}
		}
		return filtered;
	}


	ngOnInit() {

		this.artForm = this.formBuilder.group({
			'art-name': ['', Validators.required],
			'art-description': ['', Validators.required],
			'art-tags': this.artTagsForm,
			'art-date': ['', Validators.required],
			'art-file': ['', Validators.required],
		})

	}

	onFileUpload(event) {

		if(event.target.files && event.target.files.length > 0) {
			let file = event.target.files[0];

			let storageRef = firebase.storage().ref('arts/' + file.name);

			storageRef.put(file).on('state_changed',
				(snapshot) => {
				},
				(error) => {
					console.log(error)
				},
				() => {
					storageRef.getDownloadURL().then(
						(url) => {
							this.artForm.get('art-file').setValue(url);
							console.log(this.artForm.value)
						})
				})

		}
	}

	onTagsUpdate(event) {
		console.log(event.target.value)
	}

	onSubmit() {
		console.log(this.artForm);
	}
}