import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  token: string;

  constructor(
    private router: Router) {
  }

  isAuthenticated() {
    return this.token != null;
  }

  getToken() {

    firebase.auth().currentUser.getIdToken()
      .then(
          (token: string) => this.token = token
        )
      return this.token;
  }

  //// Email/Password Auth ////
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

  signOut() {
    firebase.auth().signOut();
    this.token = null;
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
    .then(() => console.log('email sent'))
    .catch((error) => console.log(error))
  }

}