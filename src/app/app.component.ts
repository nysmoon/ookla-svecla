import { Component, OnInit } from '@angular/core';

import { environment } from '../environments/environment';
import * as firebase from 'firebase';

export const firebaseConfig = environment.firebaseConfig;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
  	// firebase.auth().signOut;
	firebase.initializeApp(firebaseConfig);
  }
}
