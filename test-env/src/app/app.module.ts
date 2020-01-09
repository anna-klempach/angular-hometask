import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { InnerBtnComponent } from './inner-btn/inner-btn.component';
import { ParentComponent } from './parent/parent.component';
import { DynamicLoadingComponent } from './dynamic-loading/dynamic-loading.component';
import { TargetDirective } from './target.directive';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { FlexComponent } from './flex/flex.component';
import { DatabaseComponent } from './database/database.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDirective } from './error.directive';
import { AnimComponent } from './anim/anim.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    InnerBtnComponent,
    ParentComponent,
    DynamicLoadingComponent,
    TargetDirective,
    FirstComponent,
    SecondComponent,
    FlexComponent,
    DatabaseComponent,
    DataDisplayComponent,
    ErrorDirective,
    AnimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [InnerBtnComponent, SecondComponent, FirstComponent]
})
export class AppModule { }
