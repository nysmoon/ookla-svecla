import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
	selector: 'os-navigation',
	templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {

constructor(private auth: AuthService) { }

ngOnInit() {


}

onLogout() {
	this.auth.signOut();
}

}