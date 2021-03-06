import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

	public email: string;
	public token;
	private isAuth: boolean;

	constructor(
		private router: Router) {
	}

	isAuthenticated() {

		let user = firebase.auth().currentUser
		console.log(user)
		if (user) {
			this.email = user.email;
			this.isAuth = true;
		} else {
			this.isAuth = false;
		}
		console.log(this.isAuth)
		return this.isAuth;
	}

	emailSignUp(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(
			response => {
				this.router.navigate(['/'])
			}
			)
		.catch(
			error => console.log(error)
			);
	}

	emailLogin(email: string, password: string) {

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(
			response => {
				firebase.auth().currentUser.getIdToken()
				.then(
					(token: string) => this.token = token
					)
				this.isAuth = true;
				console.log(this.isAuth)
				this.router.navigate(['/'])
			}
			)
		.catch(error => console.log(error));
	}

	getToken() {
		firebase.auth().currentUser.getIdToken()
		.then(
			(token: string) => {
				this.token = token
			});
		console.log(this.token)
		return this.token;

	}

	signOut() {
		firebase.auth().signOut();
	}

  // Sends email allowing user to reset password
  resetPassword(email: string) {
  	const fbAuth = firebase.auth();

  	return fbAuth.sendPasswordResetEmail(email)
  	.then(() => console.log('email sent'))
  	.catch((error) => console.log(error))
  }

}