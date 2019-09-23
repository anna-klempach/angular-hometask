import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LogoComponent } from './logo/logo.component';
import { PickABooComponent } from './pick-a-boo/pick-a-boo.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumbsComponent, LogoComponent, PickABooComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    PickABooComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ],
})
export class CoreModule { }
