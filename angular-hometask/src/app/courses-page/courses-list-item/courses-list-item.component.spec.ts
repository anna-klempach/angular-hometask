import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListItemComponent } from './courses-list-item.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { CoursesListEntry } from '../courses-list-entry';
import { DurationDisplayPipe } from 'src/app/pipes/duration-display.pipe';

describe('CoursesListItemComponent', () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;
  let courseDe: DebugElement;
  let courseEl: HTMLElement;
  let expectedCourse: CoursesListEntry;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListItemComponent, DurationDisplayPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    courseDe = fixture.debugElement;
    courseEl = fixture.nativeElement;
    expectedCourse = {
      id: 3,
      title: 'Good morning!',
      creationDate: new Date('December 17, 2017 03:24:00'),
      duration: 30,
      description: 'A very interesting video',
      topRated: false,
    };
    component.course = expectedCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain an id and title in heading', () => {
    const heading = courseEl.querySelector('.course-heading');
    expect(heading.textContent).toContain('3.GOOD MORNING!');
  });
  it('should capitalize the title in heading', () => {
    component.course.title = 'Video number three';
    fixture.detectChanges();
    const heading = courseEl.querySelector('.course-heading');
    expect(heading.textContent).toContain('VIDEO NUMBER THREE');
  });
  it('should contain date in creation field', () => {
    const heading = courseEl.querySelector('.course-creation');
    expect(heading.textContent).toContain('17 Dec, 2017');
  });
  it('should display date according to the template', () => {
    component.course.creationDate = new Date('March 25, 2019 03:24:00');
    fixture.detectChanges();
    const heading = courseEl.querySelector('.course-creation');
    expect(heading.textContent).toContain('25 Mar, 2019');
  });
  it('should contain description in description field', () => {
    const heading = courseEl.querySelector('.course-description');
    expect(heading.textContent).toContain('A very interesting video');
  });
  it('should contain duration in duration field', () => {
    const heading = courseEl.querySelector('.course-duration');
    expect(heading.textContent).toContain('30');
  });
  it('should display duration in minutes as "mm min"', () => {
    component.course.duration = 1;
    fixture.detectChanges();
    const heading = courseEl.querySelector('.course-duration');
    expect(heading.textContent).toContain('01 min');
  });
  it('should display duration in full hours as "h h 00 min"', () => {
    component.course.duration = 60;
    fixture.detectChanges();
    const heading = courseEl.querySelector('.course-duration');
    expect(heading.textContent).toContain('1 h 00 min');
  });
  it('should display duration in hours and minutes as "h h mm min"', () => {
    component.course.duration = 83;
    fixture.detectChanges();
    const heading = courseEl.querySelector('.course-duration');
    expect(heading.textContent).toContain('1 h 23 min');
    component.course.duration = 125;
    fixture.detectChanges();
    expect(heading.textContent).toContain('2 h 05 min');
  });
  it('should raise the event on delete button click and pass element id as property', () => {
    let selectedCourseId: number;
    component.deleteRequest.subscribe((id: number) => selectedCourseId = id);
    const button: HTMLElement = courseEl.querySelector('.delete-button');
    button.click();
    expect(selectedCourseId).toBe(expectedCourse.id);
  });
  it('should display a star if a component is top rated', () => {
    component.course.topRated = true;
    fixture.detectChanges();
    let icon: HTMLElement = courseEl.querySelector('.course-rating');
    expect(icon).toBeTruthy();
    component.course.topRated = false;
    fixture.detectChanges();
    icon = courseEl.querySelector('.course-rating');
    expect(icon).toBeFalsy();
  });
});
