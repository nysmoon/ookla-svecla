import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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

	public isAuthenticated;
	public arts: Observable<{}[]>;
	public allArts = [];

	constructor(private artService: ArtService,
				private db: AngularFireDatabase) {
		this.arts = db.list('/arts').valueChanges();
		
		db.list('/arts').valueChanges().subscribe(
			(art) => console.log(art)
			)
		
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


	}
	
}