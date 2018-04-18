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

	private db = firebase.firestore();

	public artsCollection: AngularFirestoreCollection<Art>;
	public artTagCollection: AngularFirestoreCollection<Art>;
	public artsDocument: AngularFirestoreDocument<Art>;
	public artsSnapshot: any;

	public artsByTag: any;


	constructor(private afs: AngularFirestore,
		private http: Http) {

		this.artsCollection = this.afs.collection('arts', 

			all_arts =>
			{
				return all_arts.orderBy('art-date')
			});

	}

	getArts() {

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

	getArtByTag(tag) {

		let ids: any;
		let arts: any = [];

		this.artTagCollection = this.afs.collection('art-tag',
			all_tags =>
			{
				return all_tags.where('tag-id', '==', tag)
			})


		this.artTagCollection.snapshotChanges().subscribe(
			(art_tags) => {

				return art_tags.map(

					(art_tag) => {

						ids = art_tag.payload.doc.data()

						this.afs.doc('arts/' + ids['art-id']).snapshotChanges().subscribe((art) => {
							const data = art.payload.data() as Art;
							const id = art.payload.id;
							arts.push({id, ...data})
						})

					})

			})

		return arts;

	}

	addArt(art_form, art_tags: Object[]) {

		let newArtRef = this.db.collection('arts').doc();
		let new_art_id = newArtRef['id'];
		console.log(new_art_id)

		console.log(art_tags)

		art_tags.map(
			(tag) => {
				console.log(tag)

				this.db.collection('art-tag').add({'art-id': new_art_id, 'tag-id': tag['id']})

			})

		newArtRef.set(art_form)
	}

}