import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { environment } from '../../environments/environment';

@Component({
	selector: 'os-tags',
	templateUrl: './tags.component.html'
})

export class TagsComponent implements OnInit {

	private databaseURL = environment.firebaseConfig.databaseURL;

	public tags;
	public allTags;
	public edit = [];

	constructor(private db: AngularFireDatabase,
							private http: Http) {}

	ngOnInit() {

		this.getTags()

		this.tags.subscribe(
			(tags) => {
				let i = 0;
				tags.forEach(
					(tag) => {
						this.edit[i] = false;
						console.log(this.edit[i]);
						i++;
					})
			})


	}

	getTags() {
		this.tags = this.db.list('/art-tags').valueChanges();
	}

	onEditClick(index) {
		this.edit[index] = true;
	}

	onCancelEditClick(index) {
		console.log(index)
		this.edit[index] = false;
	}

	addTag(new_tag) {

		firebase.auth().currentUser.getIdToken()
		.then(
			(token: string) => {
				this.http.post(this.databaseURL + '/art-tags.json?auth=' + token, {'tag-name': new_tag.value})
				.subscribe(
					(response) => new_tag.value = '',
					(error) => console.log(error)
					);
			});

	}

}