import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesPageModule } from './courses-page/courses-page.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/app.routes';
import { LoginPageModule } from './login-page/login-page.module';
import { AuthService } from './services/auth.service';
import { AddCoursePageModule } from './add-course-page/add-course-page.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { PreloaderComponent } from './core/preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    CoursesPageModule,
    LoginPageModule,
    AddCoursePageModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
