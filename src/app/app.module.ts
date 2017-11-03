import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ArtComponent } from './art/art.component';
import { ArtItemComponent } from './art/art-item.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

import { AuthService } from './core/auth.service';
import { AuthGuardService } from './core/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    NavigationComponent,
    HomeComponent,
    ArtComponent,
    ArtItemComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
