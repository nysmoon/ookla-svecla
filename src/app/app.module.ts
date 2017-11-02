import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routing } from './app.routing';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ArtComponent } from './art/art.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

import { AuthService } from './core/auth.service';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    NavigationComponent,
    HomeComponent,
    ArtComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFireDatabase
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
