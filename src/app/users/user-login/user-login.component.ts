import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';

import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'os-user-login',
	templateUrl: './user-login.component.html'
})
export class UserLoginComponent implements OnInit {

	userForm: FormGroup;
	userRequest: string; // to toggle login or signup form
	passReset = true; // set to true when password reset is triggered
	formErrors = {
		'email': '',
		'password': ''
	};
	validationMessages = {
		'email': {
			'required': 'Email is required. ',
			'email': 'Email must be a valid email. '
		},
		'password': {
			'required': 'Password is required. ',
			'pattern': 'Password must include at least one letter and one number. ',
			'minlength': 'Password must be at least 6 characters long. ',
			'maxlength': 'Password cannot be more than 25 characters long. ',
		}
	};

	constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: ActivatedRoute) {
		
	}

	ngOnInit() {

		this.buildForm();
	}

	onSubmit(request) {

		this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
	}

	resetPassword() {
		this.auth.resetPassword(this.userForm.value['email'])
		.then(() => this.passReset = true)
	}

	buildForm(): void {
		this.userForm = this.formBuilder.group({
			'email': ['', [
				Validators.required,
				Validators.email
				]],
			'password': ['', [
				Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$'),
				Validators.minLength(6),
				Validators.maxLength(25)
				]],
		});

		this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged(); // reset validation messages
	}

	// Updates validation state on form changes.
	onValueChanged(data?: any) {
		if (!this.userForm) { return; }
		const form = this.userForm;
		for (const field in this.formErrors) {
			if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
				// clear previous error message (if any)
				this.formErrors[field] = '';
				const control = form.get(field);
				if (control && control.dirty && !control.valid) {
					const messages = this.validationMessages[field];
					for (const key in control.errors) {
						if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
							this.formErrors[field] += messages[key] + ' ';
						}
					}
				}
			}
		}
	}

}
