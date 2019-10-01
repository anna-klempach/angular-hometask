import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { CoursesListItem } from '../courses-list-item.model';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: CoursesListItem[];
  searchValue = '';
  delete = 'false';
  deleteModalOpened = false;
  itemToDelete: number | null = null;
  windowLocked = false;
  @Output() lockWindow = new EventEmitter<boolean>(); // will need later for communication

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

  updateSearchValue(value: string) { // quite unnecessary at the moment, might use later
    this.searchValue = value;
    console.log(this.searchValue);
  }

  deleteItem(id: number) {
    this.deleteModalOpened = true;
    this.windowLocked = true;
    this.lockWindow.emit(true);
    this.itemToDelete = id;
  }

  handleDeleteItem(value: boolean) {
    if (value) {
      this.coursesService.removeItem(this.itemToDelete);
      this.courses = this.coursesService.getCourses();
    }
    this.itemToDelete = null;
    this.deleteModalOpened = false;
    this.lockWindow.emit(false);
    this.windowLocked = false;
  }

  handleLoad() {
    console.log('The "Load more" button has been clicked.');
  }

}
