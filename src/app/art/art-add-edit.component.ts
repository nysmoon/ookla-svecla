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

	onFileChange(event) {
		let reader = new FileReader();
		if(event.target.files && event.target.files.length > 0) {
			let file = event.target.files[0];
			reader.readAsDataURL(file);
			reader.onload = () => {
				console.log(file)
				this.artForm.get('art-file').setValue(
					file.name
					// filename: file.name,
					// filetype: file.type,
					// value: reader.result.split(',')[1]
				)
			};
		}
	}

	onSubmit() {
		console.log(this.artForm);
	}
}