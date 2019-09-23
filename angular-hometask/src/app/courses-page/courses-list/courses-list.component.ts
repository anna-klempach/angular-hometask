import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CoursesListEntry } from '../courses-list-entry';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: CoursesListEntry[];
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }
}
