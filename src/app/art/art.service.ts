import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase/app';

import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';

declare var $: any;

@Injectable()
export class ArtService {

	public arts = [];
	public allArts = [];
	private database = firebase.database();
	private databaseURL = environment.firebaseConfig.databaseURL


	constructor(private http: Http,
		private authService: AuthService,
				private db: AngularFireDatabase) {
		console.log(environment['databaseURL'])
	}

	getArtTags() {
		return this.http.get('../assets/art-tags.json')
		.toPromise()
		.then(res => { return res.json().data } );
	}

	getArts() {
	}

	addArt(art: any) {

		const token = this.authService.getToken();

		let newArt = JSON.stringify(art);

		// let arts = [];
		// this.getArts().subscribe((arts) => { return arts; });

		return this.http.post(this.databaseURL + '/arts.json?auth=' + token, newArt);
	}
}