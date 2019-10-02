import { Route } from '@angular/router';
import { CoursesListComponent } from './app/courses-page/courses-list/courses-list.component';
import { LoginPageComponent } from './app/login-page/login-page/login-page.component';

export const ROUTES: Route[] = [
    { path: 'courses', component: CoursesListComponent },
    { path: 'log-in', component: LoginPageComponent },
    { path: '', redirectTo: 'courses', pathMatch: 'full' }
];
