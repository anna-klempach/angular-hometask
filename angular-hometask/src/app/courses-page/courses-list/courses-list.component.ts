import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { CoursesListItem } from '../courses-list-item.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: CoursesListItem[];
  searchValue = '';
  delete = 'false';
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

  updateSearchValue(value: string) { // quite unnecessary at the moment, might use later
    this.searchValue = value;
    console.log(this.searchValue);
  }

  deleteItem(id: number) {
    console.log(`Item to delete is ${id}.`);
  }

  handleLoad() {
    console.log('The "Load more" button has been clicked.');
  }

}
