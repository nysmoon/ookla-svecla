import { Component } from '@angular/core';

import { Art } from './art.model';


@Component({
	selector: 'os-art',
	templateUrl: './art.component.html'
})

export class ArtComponent {

	date = new Date;

	// arts: Art[] = [
	// 	new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today', ['paint', 'nature']),
	// 	new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today', ['pencil', 'contest']),
	// 	new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today', ['video', 'nature']),
	// 	new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today', ['paint', 'contest', 'blahblah'])
	// ];

	arts = [
		{
			'id': 1,
			'title': 'Test Image',
			'description': 'Test Description',
			'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
			'date': 'Feb 19, 2018',
			'tags': ['paint', 'nature']
		},{
			'id': 2,
			'title': 'Test Image',
			'description': 'Test Description',
			'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
			'date': 'Feb 19, 2018',
			'tags': ['paint', 'nature']			
		},{
			'id': 3,
			'title': 'Test Image',
			'description': 'Test Description',
			'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
			'date': 'Feb 19, 2018',
			'tags': ['paint', 'nature']			
		},{
			'id': 4,
			'title': 'Test Image',
			'description': 'Test Description',
			'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
			'date': 'Feb 19, 2018',
			'tags': ['paint', 'nature']			
		},{
			'id': 5,
			'title': 'Test Image',
			'description': 'Test Description',
			'url': 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg',
			'date': 'Feb 19, 2018',
			'tags': ['paint', 'nature']			
		}
	]
	
}