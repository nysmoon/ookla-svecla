import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ArtFormComponent } from './art-form.component'
import { TagService } from '../tags/tags.service';

import { Art } from './art.model';

@Component({
	selector: 'os-art-item',
	templateUrl: './art-item.component.html'
})

export class ArtItemComponent implements OnInit {

	@Input() art: Art;

	public tags: any;
	public art_tag_names: any;

	constructor(private modalService: NgbModal, private tagService: TagService) {
	}

	ngOnInit() {

		let art_tags = this.tagService.getTagsByArt(this.art['id']).subscribe(
			(tags) => {
				this.tags = []
				tags.forEach(
					(tag) => {
						this.tags.push(tag);
					})

			})

	}

	editArt(art) {
		// const modalRef = this.modalService.open(ArtAddEditComponent);
		// modalRef.componentInstance.art = art;
	}

}