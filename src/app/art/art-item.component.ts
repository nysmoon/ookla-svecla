import { Component, Input } from '@angular/core';

import { Art } from './art.model'

@Component({
	selector: 'os-art-item',
	templateUrl: './art-item.component.html'
})

export class ArtItemComponent {

	@Input() art: Art;

}