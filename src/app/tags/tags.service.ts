import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import * as firebase from 'firebase/app';

import { environment } from '../../environments/environment';

declare var $: any;

interface Tag {
	id?: any,
	'tag-name': string;
}

@Injectable()
export class TagService {

	public tagsCollection: AngularFirestoreCollection<Tag>;
	public tagsDocument: AngularFirestoreDocument<Tag>;
	public tagsSnapshot: any;

	public tags: Object[] = [];

	constructor(private afs: AngularFirestore,
		private http: Http) {

		this.tagsCollection = this.afs.collection('tags', 
			all_tags =>
			{
				return all_tags.orderBy('tag-name')
			})

	}

	getTags() {

		return this.tagsCollection.snapshotChanges()
		.map( 
			all_tags => {
				return all_tags.map(snap => {
					const data = snap.payload.doc.data() as Tag;
					const id = snap.payload.doc.id;
					return {id, ...data };
				})
			});
	}
}