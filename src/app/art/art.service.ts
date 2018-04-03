import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';

import 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { Art } from './art.model';

declare var $: any;

@Injectable()
export class ArtService {

	public artsCollection: AngularFirestoreCollection<Art>;
	public artsDocument: AngularFirestoreDocument<Art>;
	public artsSnapshot: any;

	public artsByTag: any;


	constructor(private afs: AngularFirestore,
		private http: Http) {
	}

	getArts() {

		this.artsCollection = this.afs.collection('arts', 
			all_arts =>
			{
				return all_arts.orderBy('art-date')
			});

		return this.artsCollection.snapshotChanges()
		.map( 
			all_arts => {
				return all_arts.map(snap => {
					const data = snap.payload.doc.data() as Art;
					const id = snap.payload.doc.id;
					return {id, ...data };
				})
			});
	}

	getArtById(art_id) {
		return this.afs.doc('arts/' + art_id)
	}

	getArtByTag(tag_id) {
		this.artsCollection = this.afs.collection('arts', 
			all_arts =>
			{
				return all_arts.orderBy('art-date').where('tags.' + tag_id, '==', true)
			});

		return this.artsCollection.snapshotChanges()
		.map( 
			all_arts => {
				return all_arts.map(snap => {
					const data = snap.payload.doc.data() as Art;
					const id = snap.payload.doc.id;
					return {id, ...data };
				})
			});


	}

}