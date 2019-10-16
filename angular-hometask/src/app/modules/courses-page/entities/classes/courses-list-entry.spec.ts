import { CoursesListEntry } from './courses-list-entry';

describe('CoursesListEntry', () => {
  it('should create an instance', () => {
    expect(new CoursesListEntry(1, 'Hello', new Date(), 15, 'description')).toBeTruthy();
  });
  it('should setup default values', () => {
    const entry = new CoursesListEntry(1, 'Hello', new Date());
    expect(entry.description).toBe('');
    expect(entry.duration).toBe(0);
  });
});
