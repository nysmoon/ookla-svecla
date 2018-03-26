import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { ForgotPasswordComponent } from './users/user-login/forgot-password.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { ArtComponent } from './art/art.component';
import { TagsComponent } from './tags/tags.component';
import { ArtFormComponent } from './art/art-form.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const osRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	}, {
		path: 'login',
		component: UserLoginComponent
	}, {
		path: 'forgot-password',
		component: ForgotPasswordComponent
	}, {
		path: 'profile',
		component: UserProfileComponent
	}, {
		path: 'art',
		component: ArtComponent
	}, {
		path: 'art-form',
		component: ArtFormComponent
	}, {
		path: 'tags',
		component: TagsComponent
	}, {
		path: 'not-found',
		component: NotFoundComponent
	}, {
		path: '**',
		redirectTo: '/not-found'
	}
];

export const Routing = RouterModule.forRoot(osRoutes);