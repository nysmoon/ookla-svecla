import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import {Observable} from 'rxjs/Observable';

import { Art } from './art.model';

import { ArtService } from './art.service';


@Component({
	selector: 'os-art',
	templateUrl: './art.component.html'
})

export class ArtComponent implements OnInit {



	date = new Date;

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



		// this.artService.getArts();

		// this.arts = this.artService.allArts


	}

	// 	this.artService.getArts().subscribe(


	// let arts_ = [
	// {
	// 	'id': 1,
	// 	'title': 'Test Image',
	// 	'description': 'Test Description',
	// 	'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
	// 	'date': 'Feb 19, 2018',
	// 	'tags': ['paint', 'nature']
	// },{
	// 	'id': 2,
	// 	'title': 'Test Image',
	// 	'description': 'Test Description',
	// 	'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
	// 	'date': 'Feb 19, 2018',
	// 	'tags': ['paint', 'nature']			
	// },{
	// 	'id': 3,
	// 	'title': 'Test Image',
	// 	'description': 'Test Description',
	// 	'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
	// 	'date': 'Feb 19, 2018',
	// 	'tags': ['paint', 'nature']			
	// },{
	// 	'id': 4,
	// 	'title': 'Test Image',
	// 	'description': 'Test Description',
	// 	'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
	// 	'date': 'Feb 19, 2018',
	// 	'tags': ['paint', 'nature']			
	// },{
	// 	'id': 5,
	// 	'title': 'Test Image',
	// 	'description': 'Test Description',
	// 	'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
	// 	'date': 'Feb 19, 2018',
	// 	'tags': ['paint', 'nature']			
	// }
	// ]
	
}