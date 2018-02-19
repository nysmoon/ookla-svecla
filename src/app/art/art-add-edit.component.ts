import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
	selector: 'os-art-add-edit',
	templateUrl: './art-add-edit.component.html'
})

export class ArtAddEditComponent implements OnInit {

	public artForm: FormGroup;
	public artTagsForm: FormArray;

	constructor(private formBuilder: FormBuilder) {}


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

	onSubmit() {
		console.log(this.artForm);
	}
}