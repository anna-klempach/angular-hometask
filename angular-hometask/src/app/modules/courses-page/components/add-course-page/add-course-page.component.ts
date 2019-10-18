import { Component, OnInit } from '@angular/core';
import { ICoursesListItem } from 'src/app/interfaces/courses-list-item.model';
import { CoursesListEntry } from 'src/app/modules/courses-page/entities/classes/courses-list-entry';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { addCourse } from '../../state/manage-courses-list/manage-courses-list.actions';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {
  public editCourse: ICoursesListItem;
  public addCourseForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    creationDate: new FormControl(''),
    duration: new FormControl(''),
    // authors: new FormControl(''),
  });

  constructor(private router: Router, private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.editCourse = new CoursesListEntry(new Date().valueOf(), '', undefined, 0, '', false); // we'll make id a current date
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

  handleDateInput(value: string): void {
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      creationDate: value
    });
  }

  handleDurationInput(value: string): void {
    const inputDuration = +value;
    if (inputDuration && typeof inputDuration === 'number' && inputDuration >= 0) {
      this.addCourseForm.patchValue({
        ...this.addCourseForm,
        duration: value
      });
    }
  }

  handleSave(): void {
    this.editCourse = {
      ...this.editCourse,
      ...this.addCourseForm.value
    };
    this.store.dispatch(addCourse({course: this.editCourse}));
    this.router.navigate(['courses']);
  }

  handleCancel(): void {
    this.editCourse = undefined;
    this.router.navigate(['courses']);
  }

}
