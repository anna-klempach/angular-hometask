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


@NgModule({
  declarations: [
    SearchBarComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    CoursePlateBorderDirective,
    OrderByPipe,
    SortByPipe,
    ModalDialogComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CoursesListComponent,
  ]
})
export class CoursesPageModule { }
