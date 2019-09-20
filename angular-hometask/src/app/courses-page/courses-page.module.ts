import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';



@NgModule({
  declarations: [SearchBarComponent, CoursesListComponent, CoursesListItemComponent],
  imports: [
    CommonModule
  ]
})
export class CoursesPageModule { }
