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
  private editedCourse: CoursesListEntry;

  constructor(private route: ActivatedRoute, private router: Router, private service: CoursesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.course = this.service.getItem(+id);
    this.editedCourse = {...this.course};
  }

  editCourse(key: string, value: string | number): void {
    this.editedCourse[key] = value;
  }
  editCourseDate(value: string) {
    this.editedCourse.creationDate = new Date(value);
  }

  handleCancelClick() {
    this.router.navigate(['courses']);
  }

  handleSaveClick() {
    this.course = this.editedCourse;
    console.log(this.course);
    this.service.updateItem(this.course);
    this.router.navigate(['courses']);
  }

}
