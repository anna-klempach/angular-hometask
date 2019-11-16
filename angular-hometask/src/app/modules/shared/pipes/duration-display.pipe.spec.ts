import { DurationDisplayPipe } from './duration-display.pipe';

describe('DurationDisplayPipe', () => {
  const pipe = new DurationDisplayPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert mins accoording to "mm min" template', () => {
    expect(pipe.transform(5, 'en')).toBe('05 min.');
    expect(pipe.transform(20, 'en')).toBe('20 min.');
  });

  it('should convert hour and mins according to "h h mm min" template', () => {
    expect(pipe.transform(60, 'en')).toBe('1 h. 00 min.');
    expect(pipe.transform(80, 'en')).toBe('1 h. 20 min.');
    expect(pipe.transform(185, 'en')).toBe('3 h. 05 min.');
  });
});
