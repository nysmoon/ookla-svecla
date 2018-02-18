import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
	selector: 'os-navigation',
	templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {

	public isAuthenticated: boolean;
	public email: string;

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit() {

		let self = this;

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.email = user.email;
				self.isAuthenticated = true;
			} else {
				self.isAuthenticated = false;
			}
		});
	}

	onLogout() {
		this.auth.signOut();
		this.router.navigate(['']);
	}

}