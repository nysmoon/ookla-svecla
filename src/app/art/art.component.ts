import { Component } from '@angular/core';

@Component({
	selector: 'os-art',
	templateUrl: './art.component.html'
})

export class ArtComponent {

	art: {name: string, url: string};
	
}