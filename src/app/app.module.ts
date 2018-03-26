import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { ForgotPasswordComponent } from './users/user-login/forgot-password.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ArtComponent } from './art/art.component';
import { TagsComponent } from './tags/tags.component';
import { ArtItemComponent } from './art/art-item.component';
import { ArtAddEditComponent } from './art/art-add-edit.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

import { ArtService } from './art/art.service';

import { AuthService } from './core/auth.service';
import { AuthGuardService } from './core/auth-guard.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    NavigationComponent,
    HomeComponent,
    ArtComponent,
    ArtItemComponent,
    ArtAddEditComponent,
    TagsComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgbModule.forRoot(),
    AutoCompleteModule,
    ButtonModule,
    InputTextModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ArtService
  ],
  entryComponents: [
    ArtAddEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
