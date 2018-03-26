import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';

import { environment } from '../../environments/environment';

declare let $: any;

interface Tag {
	id?: any,
	'tag-name': string;
}

@Component({
	selector: 'os-tags',
	templateUrl: './tags.component.html'
})

export class TagsComponent implements OnInit {

	private databaseURL = environment.firebaseConfig.databaseURL;

	public tagsCollection: AngularFirestoreCollection<Tag>;
	public tagsDocument: AngularFirestoreDocument<Tag>;
	public tagsSnapshot: any;
	public tags: Observable<Tag[]>;
	public tag: Observable<Tag>;

	public allTags = [];
	public edit = [];

	constructor(private afs: AngularFirestore,
		private http: Http) {}

	ngOnInit() {

		this.getTags()



		this.tagsCollection.valueChanges().subscribe(
			(tags) => {
				let i = 0;
				tags.forEach(
					(tag) => {
						this.edit[i] = false;
						i++;
					})
			})


	}

	getTags() {

		this.tagsCollection = this.afs.collection('tags', 
			all_tags =>
			{
				return all_tags.orderBy('tag-name')
			})

		this.tagsSnapshot = this.tagsCollection.snapshotChanges()
			.map( 
				all_tags => {
					return all_tags.map(snap => {
						const data = snap.payload.doc.data() as Tag;
            const id = snap.payload.doc.id;
            return {id, ...data };
					})
				});

		this.tagsSnapshot.subscribe(
			(tags) => {
				this.allTags = []
				tags.forEach(
					(tag) => this.allTags.push(tag)
					)
			})

	}

	onEditClick(tag, index) {
		this.edit[index] = true;
	}

	onCancelEditClick(index) {
		this.edit[index] = false;
	}

	addTag(new_tag) {

		this.tagsCollection.add({'tag-name': new_tag.value});
		new_tag.value = '';

	}

	editTag(tag_id, tag_index) {

		this.tagsDocument = this.afs.doc('tags/' + tag_id)

		this.tagsDocument.update({ 'tag-name': $('#edit-tag-input-' + tag_index).val() })

		this.edit[tag_index] = false;

	}

}