import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

	public email: string;
	private token;

	constructor(
		private router: Router) {
	}

	isAuthenticated() {

		var user = firebase.auth().currentUser;

		if (user) {
			return true;
		} else {
			return false;
		}

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
				this.router.navigate(['/'])
			}
			)
		.catch(error => console.log(error));
	}

	getToken() {
		firebase.auth().currentUser.getIdToken()
		.then(
			(token: string) => this.token = token
			);
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