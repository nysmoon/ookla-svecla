import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtComponent } from './art/art.component';

const osRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	}, {
		path: 'art',
		component: ArtComponent
	}
];

export const Routing = RouterModule.forRoot(osRoutes);