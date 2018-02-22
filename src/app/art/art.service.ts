import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';


@Injectable()
export class ArtService {

	constructor(private http: Http) {}

	getArtTags() {
		return this.http.get('../assets/art-tags.json')
		.toPromise()
		.then(res => { return res.json().data } );
	}
}