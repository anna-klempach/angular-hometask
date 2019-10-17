import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/modules/courses-page/services/courses/courses.service';
import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';
import { CoursesListEntry } from '../../entities/classes/courses-list-entry';
import { Store } from '@ngrx/store';
import { IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { editCourse } from '../../state/manage-courses-list/manage-courses-list.actions';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  public course: ICoursesListItem;
  public loaded = false;
  private editedCourse: CoursesListEntry;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: CoursesService,
    private store: Store<IAppState>) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loaded = false;
    this.service.getItem(+id)
      .subscribe(courses => {
        this.loaded = true;
        this.course = courses[0];
        this.editedCourse = { ...this.course };
      });
  }

  editCourse(key: string, value: string | number): void {
    this.editedCourse[key] = value;
  }
  editCourseDate(value: string): void {
    this.editedCourse.creationDate = new Date(value);
  }

  handleCancelClick(): void {
    this.router.navigate(['courses']);
    this.editedCourse = undefined;
  }

  handleSaveClick(): void {
    this.store.dispatch(editCourse({ course: this.editedCourse }));
    this.router.navigate(['courses']); // should it be asynchronous?
  }
}
