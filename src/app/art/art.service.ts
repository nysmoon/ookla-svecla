import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase/app';

import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { AuthService } from '../core/auth.service';

declare var $: any;

@Injectable()
export class ArtService {

	artsChanged = new Subject<Object[]>();

	public arts = [];
	public allArts = [];
	private database = firebase.database();


	constructor(private http: Http,
		private authService: AuthService,
				private db: AngularFireDatabase) {}

	getArtTags() {
		return this.http.get('../assets/art-tags.json')
		.toPromise()
		.then(res => { return res.json().data } );
	}

	getArts() {
		// this.db.list('/arts').subscribe(items => {
  //   items.forEach(item => {
  //     Object.keys(item).map(key=>item[key]).map(order => {
  //       console.log(order);
  //     })
  //   })
  // })
		// this.http.get('https://ookla-svecla-dev.firebaseio.com/arts.json')
	}

	addArt(art: any) {

		const token = this.authService.getToken();

		let newArt = JSON.stringify(art);

		// let arts = [];
		// this.getArts().subscribe((arts) => { return arts; });

		return this.http.post('https://ookla-svecla-dev.firebaseio.com/arts.json?auth=' + token, newArt);
	}
}