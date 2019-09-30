import { SortByPipe } from './sort-by.pipe';
import { CoursesListEntry } from '../courses-page/courses-list-entry';
const COURSES = [
  new CoursesListEntry(1, 'Video One', new Date('June 12, 2018 02:24:00'),
    20, 'A very interesting video about a very importatnt topic.', true),
  new CoursesListEntry(2, 'Video Two', new Date('August 30, 2019 14:24:00'),
    40, 'Another very interesting video about an even more interesting topic.', true),
  new CoursesListEntry(3, 'Video Three', new Date('December 17, 2017 03:24:00'),
    15, 'Not a very interesting video but the topic is extremely important and you have to watch it, thanks God it is quite short.', false),
];

const COURSES_BY_THREE = [
  new CoursesListEntry(3, 'Video Three', new Date('December 17, 2017 03:24:00'),
    15, 'Not a very interesting video but the topic is extremely important and you have to watch it, thanks God it is quite short.', false),
];
const pipe = new SortByPipe();
describe('SortByPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort the items according to the key word', () => {
    expect(pipe.transform(COURSES, 'video')).toEqual(COURSES);
    expect(pipe.transform(COURSES, 'THREE')).toEqual(COURSES_BY_THREE);
  });

  it('should return an empty array if the key word does not match', () => {
    expect(pipe.transform(COURSES, 'hello')).toEqual([]);
  });

});
