import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { CoursePlateBorderDirective } from './course-plate-border.directive';
import { DurationDisplayPipe } from '../pipes/duration-display.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';


@NgModule({
  declarations: [
    SearchBarComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    CoursePlateBorderDirective,
    DurationDisplayPipe,
    OrderByPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesListComponent,
  ]
})
export class CoursesPageModule { }
