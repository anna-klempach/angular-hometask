import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/material';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SharedModule
  ],
  exports: [LoginPageComponent],
})
export class LoginPageModule { }
