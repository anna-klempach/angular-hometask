import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddCoursePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AddCoursePageComponent
  ]
})
export class AddCoursePageModule { }
