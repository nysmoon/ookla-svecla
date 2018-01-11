import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
	selector: 'os-art-add-edit',
	templateUrl: './art-add-edit.component.html'
})

export class ArtAddEditComponent implements OnInit {

	public artForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}


	ngOnInit() {

		this.artForm = this.formBuilder.group({
			'art-name': ['', Validators.required],
			'art-description': ['', Validators.required],
			'art-date': ['', Validators.required],
			'art-file': ['', Validators.required],
		})

	}


	onSubmit() {
		console.log(this.artForm);
	}
}