import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
	selector: 'os-forgot-password',
	templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit  {

	public forgotPasswordForm: FormGroup;


	constructor( private formBuilder: FormBuilder ) {}

	ngOnInit() {
		this.forgotPasswordForm = this.formBuilder.group({
			'email': ['', [ Validators.required, Validators.email ]]
		});
		console.log(this.forgotPasswordForm);
	}

	buildForm() {

		this.forgotPasswordForm = this.formBuilder.group({
			'email': ['', [ Validators.required, Validators.email ]]
		});

	}
	
}