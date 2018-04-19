import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ArtFormComponent } from './art-form.component'
import { TagService } from '../tags/tags.service';

import { Art } from './art.model';

import { Subscription } from "rxjs/Subscription";

@Component({
	selector: 'os-art-item',
	templateUrl: './art-item.component.html'
})

export class ArtItemComponent implements OnInit {

	@Input() art: Art;

	public tags: Object[];
	public art_tag_names: any;

	private subscriptions = new Subscription();

	constructor(private modalService: NgbModal, private tagService: TagService) {
	}

	ngOnInit() {

		
		this.tags = this.tagService.getTagsByArt(this.art['id']);

	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe()
	}	

}