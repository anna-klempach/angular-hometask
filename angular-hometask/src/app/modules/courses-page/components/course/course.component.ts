import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/modules/courses-page/services/courses/courses.service';
import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';
import { CoursesListEntry } from '../../entities/classes/courses-list-entry';
import { Store } from '@ngrx/store';
import { IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { editCourse } from '../../state/manage-courses-list/manage-courses-list.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { dateValidator } from '../../entities/validators/date-validator.directive';
import { durationValidator } from '../../entities/validators/duration-validator.directive';
import { authorsListValidator } from '../../entities/validators/authors-list-size.directive';
import { CustomErrorStateMatcher } from '../../entities/classes/error-state-matcher';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-course',
  templateUrl: '../add-course-page/add-course-page.component.html',
  styleUrls: ['../add-course-page/add-course-page.component.scss']
})
export class CourseComponent implements OnInit {
  public course: ICoursesListItem;
  public loaded = false;
  private editCourse: CoursesListEntry;
  public addCourseForm: FormGroup;

  public matcher = new CustomErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CoursesService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loaded = false;
    this.service.getItem(+id)
      .subscribe(courses => {
        this.loaded = true;
        this.course = courses[0];
        this.editCourse = { ...this.course };
        this.addCourseForm = new FormGroup({
          title: new FormControl(
            this.course.title, [
            Validators.required,
            Validators.maxLength(50)
          ]),
          description: new FormControl(this.course.description, [
            Validators.required,
            Validators.maxLength(500)
          ]),
          creationDate: new FormControl(this.formatDate(), [
            Validators.required,
            dateValidator
          ]),
          duration: new FormControl(this.course.duration,
            [
              Validators.required,
              durationValidator
            ]),
          authors: new FormControl(this.course.authors,
            [
              Validators.required,
              authorsListValidator
            ]),
        });
        this.loaded = true;
      });
  }

  handleTitleInput(value: string): void {
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      title: value
    });
  }

  private formatDate(): string {
    const date = new Date(this.course.creationDate);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  }

  handleDescriptionInput(value: string): void {
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      description: value
    });
  }

  private calculateDate() {
    const currentDate = this.addCourseForm.value.creationDate;
    const currentValue = currentDate.split('/');
    return new Date(`${currentValue[1]}/${currentValue[0]}/${currentValue[2]}`);
  }

  handleSave(): void {
    console.log(this.addCourseForm.value);
    const date = this.calculateDate();
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      creationDate: date
    });
    this.editCourse = {
      ...this.editCourse,
      ...this.addCourseForm.value
    };
    this.store.dispatch(editCourse({ course: this.editCourse }));
    this.router.navigate(['courses']);
  }

  handleCancel(): void {
    this.editCourse = undefined;
    this.router.navigate(['courses']);
  }

  /* editCourse(key: string, value: string | number): void {
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
  } */
}
