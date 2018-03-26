import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import * as firebase from 'firebase/app';

import { environment } from '../../environments/environment';

import { TagService } from './tags.service';

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

	public tagsDocument: AngularFirestoreDocument<Tag>;

	public tags = [];
	public edit = [];

	constructor(private afs: AngularFirestore,
							private http: Http,
							private tagService: TagService) {}

	ngOnInit() {

		this.tagService.getTags().subscribe(
			(tags) => {
				this.tags = []
				tags.forEach(
					(tag) => {
						this.tags.push(tag)
					})

			})

		this.tagService.getTags().subscribe(
			(tags) => {
				let i = 0;
				tags.forEach(
					(tag) => {
						this.edit[i] = false;
						i++;
					})
			})


	}

	onEditClick(tag, index) {
		this.edit[index] = true;
	}

	onCancelEditClick(index) {
		this.edit[index] = false;
	}

	addTag(new_tag) {

		this.tagService.tagsCollection.add({'tag-name': new_tag.value});
		new_tag.value = '';

	}

	editTag(tag_id, tag_index) {

		this.tagsDocument = this.afs.doc('tags/' + tag_id)

		this.tagsDocument.update({ 'tag-name': $('#edit-tag-input-' + tag_index).val() })

		this.edit[tag_index] = false;

	}

}