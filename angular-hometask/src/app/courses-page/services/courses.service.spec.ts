import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { CoursesListEntry } from '../courses-list-entry';

const COURSES: CoursesListEntry[] = [
  new CoursesListEntry(1, 'Video One', new Date('June 12, 2018 02:24:00'),
    20, 'A very interesting video about a very importatnt topic.', true),
  new CoursesListEntry(2, 'Video Two', new Date('August 30, 2019 14:24:00'),
    40, 'Another very interesting video about an even more interesting topic.', true),
  new CoursesListEntry(3, 'Video Three', new Date('December 17, 2017 03:24:00'),
    15, 'Not a very interesting video but the topic is extremely important and you have to watch it, thanks God it is quite short.', false),
  new CoursesListEntry(4, 'Video Four', new Date('February 18, 2018 05:24:00'),
    60, 'An absolutely useless video, if you do not want you may not watch it.', false),
  new CoursesListEntry(5, 'Video Five', new Date('September 29, 2019 14:24:00'),
    125, 'A video that has been published recently.', true),
  new CoursesListEntry(6, 'Video Six', new Date('October 20, 2019 14:24:00'),
    155, 'A video yet to come.'),
];

const EXPECTED_COURSES: CoursesListEntry[] = [
  new CoursesListEntry(1, 'Video One', new Date('June 12, 2018 02:24:00'),
    20, 'A very interesting video about a very importatnt topic.', true),
  new CoursesListEntry(2, 'Video Two', new Date('August 30, 2019 14:24:00'),
    40, 'Another very interesting video about an even more interesting topic.', true),
  new CoursesListEntry(4, 'Video Four', new Date('February 18, 2018 05:24:00'),
    60, 'An absolutely useless video, if you do not want you may not watch it.', false),
  new CoursesListEntry(5, 'Video Five', new Date('September 29, 2019 14:24:00'),
    125, 'A video that has been published recently.', true),
  new CoursesListEntry(6, 'Video Six', new Date('October 20, 2019 14:24:00'),
    155, 'A video yet to come.'),
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
  it('should return an item by id', () => {
    const service: CoursesService = TestBed.get(CoursesService);
    expect(service.getItem(2)).toEqual(COURSES[1]);
    expect(service.getItem(8)).toBeNull();
  });
  it('should delete an item by id', () => {
    const service: CoursesService = TestBed.get(CoursesService);
    expect(service.removeItem(3)).toEqual(EXPECTED_COURSES);
  });
});
