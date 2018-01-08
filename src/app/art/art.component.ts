import { Component } from '@angular/core';

import { Art } from './art.model';


@Component({
	selector: 'os-art',
	templateUrl: './art.component.html'
})

export class ArtComponent {

	date = new Date;

	arts: Art[] = [
		new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today'),
		new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today'),
		new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today'),
		new Art('Test Image', 'Test Description', 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg', 'today')
	];
	
}