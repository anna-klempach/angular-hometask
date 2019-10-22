import { Component, OnInit } from '@angular/core';
import { ICoursesListItem } from 'src/app/interfaces/courses-list-item.model';
import { CoursesListEntry } from 'src/app/modules/courses-page/entities/classes/courses-list-entry';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { addCourse } from '../../state/manage-courses-list/manage-courses-list.actions';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { dateValidator } from '../../entities/validators/date-validator.directive';
import { durationValidator } from '../../entities/validators/duration-validator.directive';
import { CustomErrorStateMatcher } from '../../entities/classes/error-state-matcher';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {
  public editCourse: ICoursesListItem;
  public addCourseForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ]),
    creationDate: new FormControl('', [
      Validators.required,
      dateValidator
    ]),
    duration: new FormControl('',
      [
        Validators.required,
        durationValidator
      ]),
    authors: new FormControl([]),
  });

  public matcher = new CustomErrorStateMatcher();

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private fb: FormBuilder) { }

  get title() { return this.addCourseForm.get('title'); }

  ngOnInit(): void {
    this.editCourse = new CoursesListEntry(new Date().valueOf(), '', undefined, 0, '', false, []); // we'll make id a current date
  }

  handleTitleInput(value: string): void {
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      title: value
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
    console.log(this.editCourse);
    this.store.dispatch(addCourse({ course: this.editCourse }));
    console.log(this.editCourse);
    this.router.navigate(['courses']);
  }

  handleCancel(): void {
    this.editCourse = undefined;
    this.router.navigate(['courses']);
  }

}
