import { Injectable } from '@angular/core';
import { CoursesListEntry } from './courses-list-entry';

const COURSES: CoursesListEntry[] = [
  new CoursesListEntry(1, 'Video One', new Date('December 17, 2017 03:24:00'),
    20, 'A very interesting video about a very importatnt topic.'),
  new CoursesListEntry(2, 'Video Two', new Date('February 18, 2018 05:24:00'),
    40, 'Another very interesting video about an even more interesting topic.'),
  new CoursesListEntry(3, 'Video Three', new Date('June 12, 2018 02:24:00'),
    15, 'Not a very interesting video but the topic is extremely important and you have to watch it, thanks God it is quite short.'),
  new CoursesListEntry(4, 'Video Four', new Date('August 30, 2019 14:24:00'),
    50, 'An absolutely useless video, if you do not want you may not watch it.'),
  new CoursesListEntry(5, 'Video Five', new Date('September 29, 2019 14:24:00'),
    50, 'A video that has been published recently.'),
  new CoursesListEntry(6, 'Video Six', new Date('October 20, 2019 14:24:00'),
    50, 'A video yet to come.'),
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public courses = COURSES;
  constructor() { }

  getCourses(): CoursesListEntry[] {
    return this.courses;
  }
}
