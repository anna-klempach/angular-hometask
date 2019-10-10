import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { CoursesListItem } from '../courses-list-item.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: CoursesListItem[] = [];
  loaded = false;
  searchValue = '';
  delete = 'false';
  deleteModalOpened = false;
  itemToDelete: number | null = null;

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit() {
    this.loaded = false;
    this.getCourses();
  }

  searchCourses() {
    this.coursesService.discardPagesNumber();
    this.coursesService.getCourses(this.searchValue)
      .subscribe(courses => {
        this.courses = courses;
        this.loaded = true;
      });
  }

  getMoreCourses() {
    this.coursesService.increasePagesNumber(); // add check on the number of courses
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses(this.searchValue)
      .subscribe(courses => {
        this.courses = this.courses.concat(courses);
        this.loaded = true;
      });
  }

  deleteItem(id: number) {
    this.deleteModalOpened = true;
    this.itemToDelete = id;
  }

  handleDeleteItem(value: boolean) {
    if (value) {
      this.courses = this.courses.filter(c => c.id !== this.itemToDelete);
      this.coursesService
        .removeItem(this.itemToDelete)
        .subscribe();
    }
    this.itemToDelete = null;
    this.deleteModalOpened = false;
  }

  handleAddCourse() {
    this.router.navigate(['courses/new']);
  }

}
