import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { CoursesListItem } from '../courses-list-item.model';
import { CoursesListEntry } from '../courses-list-entry';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  public course: CoursesListItem;
  public loaded = false;
  private editedCourse: CoursesListEntry;

  constructor(private route: ActivatedRoute, private router: Router, private service: CoursesService) { }

  ngOnInit() {
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
  editCourseDate(value: string) {
    this.editedCourse.creationDate = new Date(value);
  }

  handleCancelClick() {
    this.router.navigate(['courses']);
    this.editedCourse = undefined;
  }

  handleSaveClick() {
    this.service.updateItem(this.editedCourse)
      .subscribe((course) => {
        this.course = course;
        this.router.navigate(['courses']);
      });
}

}
