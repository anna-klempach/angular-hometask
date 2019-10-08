import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from 'src/app/courses-page/courses-list-item.model';
import { CoursesListEntry } from 'src/app/courses-page/courses-list-entry';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {
  // consider creating an instance of CourseListItem, think it over later
  // public title: string; // need to make checks on the input data
  /* public description: string;
  public duration: number;
  public date: string; */
  public editCourse: CoursesListItem;
  constructor(private service: CoursesService, private router: Router) { }

  ngOnInit() {
    this.editCourse = new CoursesListEntry(new Date().valueOf(), '', undefined, 0, '', false); // we'll make id a current date
  }

  handleTitleInput(value: string): void {
    this.editCourse.title = value;
  }

  handleDescriptionInput(value: string): void {
    this.editCourse.description = value;
  }

  handleDateInput(value: string): void { // string for now
    this.editCourse.creationDate = new Date(value);
  }

  handleDurationInput(value: string): void {
    const inputDuration = +value;
    if (inputDuration && typeof inputDuration === 'number' && inputDuration >= 0) {
      this.editCourse.duration = inputDuration;
    }
  }

  handleSave() {
    this.service.createCourse(this.editCourse)
    .subscribe(() => {});
    this.router.navigate(['courses']);
  }

  handleCancel() {
    this.editCourse = undefined;
    this.router.navigate(['courses']);
  }

}
