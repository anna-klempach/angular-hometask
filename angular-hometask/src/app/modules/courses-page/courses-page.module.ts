import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { CoursePlateBorderDirective } from './entities/directives/course-plate-border.directive';
import { OrderByPipe } from '../shared/pipes/order-by.pipe';
import { SortByPipe } from '../shared/pipes/sort-by.pipe';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CourseComponent } from './components/course/course.component';
import { StoreModule } from '@ngrx/store';
import * as coursesReducer from './state/manage-courses-list/manage-courses-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './state/manage-courses-list/effects/load-courses.effects';
import { AddCoursePageComponent } from './components/add-course-page/add-course-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { CustomMaterialModule } from 'src/app/material';

@NgModule({
  declarations: [
    SearchBarComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    CoursePlateBorderDirective,
    OrderByPipe,
    SortByPipe,
    ModalDialogComponent,
    CourseComponent,
    AddCoursePageComponent,
    DateInputComponent,
    DurationInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(
      coursesReducer.featureKey,
      coursesReducer.reducer
    ),
    EffectsModule.forFeature([CoursesEffects]),
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  exports: [
    CoursesListComponent,
    AddCoursePageComponent
  ]
})
export class CoursesPageModule { }
