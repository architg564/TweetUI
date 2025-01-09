import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
