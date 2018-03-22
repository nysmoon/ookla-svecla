import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ArtAddEditComponent } from './art-add-edit.component'


import { Art } from './art.model';

@Component({
	selector: 'os-art-item',
	templateUrl: './art-item.component.html'
})

export class ArtItemComponent implements OnInit {

	@Input() art: Art;

	constructor(private modalService: NgbModal) {
	}

	ngOnInit() {
	}

	editArt(art) {
		const modalRef = this.modalService.open(ArtAddEditComponent);
		modalRef.componentInstance.art = art;
	}

}