import { OrderByPipe } from './order-by.pipe';
import { CoursesListEntry } from '../../courses-page/entities/classes/courses-list-entry';
const COURSES = [
  new CoursesListEntry(1, 'Video One', new Date('June 12, 2018 02:24:00'),
    20, 'A very interesting video about a very importatnt topic.', true),
  new CoursesListEntry(2, 'Video Two', new Date('August 30, 2019 14:24:00'),
    40, 'Another very interesting video about an even more interesting topic.', true),
  new CoursesListEntry(3, 'Video Three', new Date('December 17, 2017 03:24:00'),
    15, 'Not a very interesting video but the topic is extremely important and you have to watch it, thanks God it is quite short.', false),
];

const EXPECTED_COURSES = [
  new CoursesListEntry(3, 'Video Three', new Date('December 17, 2017 03:24:00'),
    15, 'Not a very interesting video but the topic is extremely important and you have to watch it, thanks God it is quite short.', false),
  new CoursesListEntry(1, 'Video One', new Date('June 12, 2018 02:24:00'),
    20, 'A very interesting video about a very importatnt topic.', true),
  new CoursesListEntry(2, 'Video Two', new Date('August 30, 2019 14:24:00'),
    40, 'Another very interesting video about an even more interesting topic.', true),
];
const pipe = new OrderByPipe();
describe('OrderByPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort the courses list according to the creation date ascending', () => {
    expect(pipe.transform(COURSES)).toEqual(EXPECTED_COURSES);
  });
});
