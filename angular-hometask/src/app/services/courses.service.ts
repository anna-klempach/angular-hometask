import { Injectable } from '@angular/core';
import { COURSES } from '../courses-page/courses';
import { CoursesListItem } from '../courses-page/courses-list-item.model';
import { CoursesListEntry } from '../courses-page/courses-list-entry';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public courses = COURSES;
  constructor() { }

  public getCourses(): CoursesListItem[] {
    return this.courses;
  }

  public createCourse(
    id: number, title: string, creationDate: Date, duration: number = 0, description: string = '', topRated: boolean = false
  ): CoursesListItem {
    return new CoursesListEntry(id, title, creationDate, duration, description, topRated);
  }

  public getItem(id: number): CoursesListItem | null {
    const filteredCourses = this.courses.filter((item) => item.id === id);
    return filteredCourses.length > 0
      ? filteredCourses[0]
      : null;
  }

  public updateItem() {
  }

  public removeItem(id: number) {
    this.courses = this.courses.filter((item) => item.id !== id);
  }
}
