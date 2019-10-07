import { Route } from '@angular/router';
import { CoursesListComponent } from './app/courses-page/courses-list/courses-list.component';
import { LoginPageComponent } from './app/login-page/login-page/login-page.component';
import { AddCoursePageComponent } from './app/add-course-page/add-course-page/add-course-page.component';
import { PageNotFoundComponent } from './app/core/page-not-found/page-not-found.component';
import { CourseComponent } from './app/courses-page/course/course.component';
import { AuthGuard } from './app/auth/auth.guard';

export const ROUTES: Route[] = [
    { path: 'courses', component: CoursesListComponent,
    canActivate: [AuthGuard]},
    { path: 'courses/new', component: AddCoursePageComponent, canActivate: [AuthGuard], data: { breadcrumb: 'new' } },
    { path: 'courses/:id', component: CourseComponent, canActivate: [AuthGuard], data: { breadcrumb: 'id' } },
    { path: 'log-in', component: LoginPageComponent },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
