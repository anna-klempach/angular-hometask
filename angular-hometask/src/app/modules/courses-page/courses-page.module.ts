import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { CoursePlateBorderDirective } from './entities/directives/course-plate-border.directive';
import { SortByPipe } from '../shared/pipes/sort-by.pipe';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CourseComponent } from './components/course/course.component';
import { StoreModule } from '@ngrx/store';
import * as coursesReducer from './state/manage-courses-list/manage-courses-list.reducer';
import * as authorsReducer from './state/manage-authors-list/manage-authors-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './state/manage-courses-list/manage-courses-list.effects';
import { AuthorsEffects } from './state/manage-authors-list/manage-authors-list.effects';
import { AddCoursePageComponent } from './components/add-course-page/add-course-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { CustomMaterialModule } from 'src/app/material';
import { AuthorsInputComponent } from './components/authors-input/authors-input.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    CoursePlateBorderDirective,
    SortByPipe,
    ModalDialogComponent,
    CourseComponent,
    AddCoursePageComponent,
    DateInputComponent,
    DurationInputComponent,
    AuthorsInputComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(
      coursesReducer.featureKey,
      coursesReducer.reducer
    ),
    StoreModule.forFeature(
      authorsReducer.featureKey,
      authorsReducer.reducer
    ),
    EffectsModule.forFeature([CoursesEffects, AuthorsEffects]),
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  exports: [
    CoursesListComponent,
    AddCoursePageComponent
  ]
})
export class CoursesPageModule { }
