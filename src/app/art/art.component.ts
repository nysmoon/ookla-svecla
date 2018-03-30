import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Art } from './art.model';

import { ArtService } from './art.service';


@Component({
	selector: 'os-art',
	templateUrl: './art.component.html'
})

export class ArtComponent implements OnInit {



	date = new Date;

	public isAuthenticated: boolean;

	public artsCollection: AngularFirestoreCollection<Art>;
	public artsDocument: AngularFirestoreDocument<Art>;
	public artsSnapshot: any;

	public arts = [];


	constructor(private artService: ArtService,
				private afs: AngularFirestore,) {
		
	}

	ngOnInit() {

		let self = this;

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.isAuthenticated = true;
			} else {
				self.isAuthenticated = false;
			}
		});

		this.artService.getArts().subscribe(
			(arts) => {
				this.arts = []
				arts.forEach(
					(art) => this.arts.push(art)
					)
			})		

	}
	
}