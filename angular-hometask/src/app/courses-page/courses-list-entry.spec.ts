import { CoursesListEntry } from './courses-list-entry';

describe('CoursesListEntry', () => {
  it('should create an instance', () => {
    expect(new CoursesListEntry(1, 'Hello', new Date(), 15, 'description')).toBeTruthy();
  });
});
