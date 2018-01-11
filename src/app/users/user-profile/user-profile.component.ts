import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

	public username: string;
	public email: string;

  constructor(private auth: AuthService) {
  	
  }

  ngOnInit() {

    let self = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.username = user.displayName;
        self.email = user.email;
        console.log(user)
      } else {
      }
    });

  }

}
