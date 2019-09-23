import { Route } from '@angular/router';
import { CoursesListComponent } from './app/courses-page/courses-list/courses-list.component';

export const ROUTES: Route[] = [
    { path: 'courses', component: CoursesListComponent },
    { path: '', redirectTo: 'courses', pathMatch: 'full' }
];
