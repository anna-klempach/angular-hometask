import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public courses: ICoursesListItem[] = [];
  public loaded = false;
  public searchValue = '';
  public delete = 'false';
  public deleteModalOpened = false;
  public itemToDelete: number | null = null;

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.loaded = false;
    this.getCourses();
  }

  searchCourses(): void {
    this.coursesService.discardPagesNumber();
    this.coursesService.getCourses(this.searchValue)
      .subscribe(courses => {
        this.courses = courses;
        this.loaded = true;
      });
  }

  getMoreCourses(): void {
    this.coursesService.increasePagesNumber(); // add check on the number of courses
    this.getCourses();
  }

  getCourses(): void {
    this.coursesService.getCourses(this.searchValue)
      .subscribe(courses => {
        this.courses = this.courses.concat(courses);
        this.loaded = true;
      });
  }

  deleteItem(id: number): void {
    this.deleteModalOpened = true;
    this.itemToDelete = id;
  }

  handleDeleteItem(value: boolean): void {
    if (value) {
      this.courses = this.courses.filter(c => c.id !== this.itemToDelete);
      this.coursesService
        .removeItem(this.itemToDelete)
        .subscribe();
    }
    this.itemToDelete = null;
    this.deleteModalOpened = false;
  }

  handleAddCourse(): void {
    this.router.navigate(['courses/new']);
  }

}
