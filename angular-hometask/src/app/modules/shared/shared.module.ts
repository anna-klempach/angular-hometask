import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationDisplayPipe } from 'src/app/modules/shared/pipes/duration-display.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LogoComponent } from './components/logo/logo.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { StoreModule } from '@ngrx/store';
import * as authenticationReducer from './state/manage-authentication/manage-authentication.reducer';

@NgModule({
  declarations: [
    DurationDisplayPipe,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LogoComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      authenticationReducer.authFeatureKey,
      authenticationReducer.reducer
    ),
  ],
  exports: [
    DurationDisplayPipe,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
})
export class SharedModule { }
