import { Component, OnInit } from '@angular/core';
import { ICoursesListItem } from 'src/app/interfaces/courses-list-item.model';
import { CoursesListEntry } from 'src/app/modules/courses-page/courses-list-entry';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {
  public editCourse: ICoursesListItem;
  constructor(private service: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.editCourse = new CoursesListEntry(new Date().valueOf(), '', undefined, 0, '', false); // we'll make id a current date
  }

  handleTitleInput(value: string): void {
    this.editCourse.title = value;
  }

  handleDescriptionInput(value: string): void {
    this.editCourse.description = value;
  }

  handleDateInput(value: string): void {
    this.editCourse.creationDate = new Date(value);
  }

  handleDurationInput(value: string): void {
    const inputDuration = +value;
    if (inputDuration && typeof inputDuration === 'number' && inputDuration >= 0) {
      this.editCourse.duration = inputDuration;
    }
  }

  handleSave(): void {
    this.service.createCourse(this.editCourse)
    .subscribe(() => {});
    this.router.navigate(['courses']);
  }

  handleCancel(): void {
    this.editCourse = undefined;
    this.router.navigate(['courses']);
  }

}
