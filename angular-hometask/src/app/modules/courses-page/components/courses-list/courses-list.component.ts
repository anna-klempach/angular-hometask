import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';
import { Router } from '@angular/router';
import { selectCourses, IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourses, deleteCourse, reloadCourses } from '../../state/manage-courses-list/manage-courses-list.actions';
import { TranslateService } from '@ngx-translate/core';


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

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private store: Store<IAppState>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.searchCourses();
  }

  searchCourses(): void {
    this.coursesService.discardPagesNumber();
    this.store.dispatch(reloadCourses({ searchValue: this.searchValue }));
  }

  getMoreCourses(): void {
    this.coursesService.increasePagesNumber();
    this.getCourses();
  }

  getCourses(): void {
    this.store.dispatch(loadCourses({ searchValue: this.searchValue }));
  }

  deleteItem(id: number): void {
    this.deleteModalOpened = true;
    this.itemToDelete = id;
  }

  handleDeleteItem(value: boolean): void {
    if (value) {
      this.store.dispatch(deleteCourse({ id: this.itemToDelete, searchValue: this.searchValue }));
    }
    this.itemToDelete = null;
    this.deleteModalOpened = false;
  }

  handleAddCourse(): void {
    this.router.navigate(['courses/new']);
  }

}
