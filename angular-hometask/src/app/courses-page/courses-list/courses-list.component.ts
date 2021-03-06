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
  searchValue = '';
  delete = 'false';
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

  deleteItem(id: number) {
    console.log(`Item to delete is ${id}.`);
  }

  handleLoad() {
    console.log('The "Load more" button has been clicked.');
  }
}
