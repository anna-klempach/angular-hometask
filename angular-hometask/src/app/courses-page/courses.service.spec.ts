import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
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
];

describe('CoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesService = TestBed.get(CoursesService);
    expect(service).toBeTruthy();
  });
  it('should return an array of objects', () => {
    const service: CoursesService = TestBed.get(CoursesService);
    expect(service.getCourses()).toEqual(COURSES);
  });
});
