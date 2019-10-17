import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';
import { Router } from '@angular/router';
import { selectCourses, IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourses, setCourses } from '../../state/manage-courses-list/manage-courses-list.actions';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public courses: ICoursesListItem[] = [];
  public courses$: Observable<ICoursesListItem[]> = this.store.pipe(select(selectCourses));
  public loaded = false;
  public searchValue = '';
  public delete = 'false';
  public deleteModalOpened = false;
  public itemToDelete: number | null = null;

  constructor(private coursesService: CoursesService,
              private router: Router,
              private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCourses({searchValue: this.searchValue}));
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
    this.store.dispatch(loadCourses({searchValue: this.searchValue}));
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
