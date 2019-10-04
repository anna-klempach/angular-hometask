import { Injectable } from '@angular/core';
import { COURSES } from '../courses-page/courses';
import { CoursesListItem } from '../courses-page/courses-list-item.model';
import { CoursesListEntry } from '../courses-page/courses-list-entry';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public courses: CoursesListItem[] = COURSES;
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

  public updateItem(courseItem: CoursesListItem) {
    const changedCourses: CoursesListItem[] = this.courses.map<CoursesListItem>((item: CoursesListItem): CoursesListItem => {
      if (item.id === courseItem.id) {
        return courseItem;
      }
      return item;
    });
    this.courses = changedCourses;
    console.log(this.courses);
  }

  public removeItem(id: number) {
    this.courses = this.courses.filter((item) => item.id !== id);
  }
}
