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
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ConfigComponent } from './config/config/config.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent
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
