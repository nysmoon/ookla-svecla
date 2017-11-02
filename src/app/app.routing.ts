import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { ArtComponent } from './art/art.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const osRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	}, {
		path: 'login',
		component: UserLoginComponent
	}, {
		path: 'profile',
		component: UserProfileComponent
	}, {
		path: 'art',
		component: ArtComponent
	}, {
		path: 'not-found',
		component: NotFoundComponent
	}, {
		path: '**',
		redirectTo: '/not-found'
	}
];

export const Routing = RouterModule.forRoot(osRoutes);