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
  it('should contain date in creation field', () => {
    const heading = courseEl.querySelector('.course-creation');
    expect(heading.textContent).toContain('17 Dec, 2017');
  });
  it('should contain description in description field', () => {
    const heading = courseEl.querySelector('.course-description');
    expect(heading.textContent).toContain('A very interesting video');
  });
  it('should contain duration in duration field', () => {
    const heading = courseEl.querySelector('.course-duration');
    expect(heading.textContent).toContain('30');
  });
  it('should raise the event on delete button click and pass element id as property', () => {
    let selectedCourseId: number;
    component.deleteRequest.subscribe((id: number) => selectedCourseId = id);
    const button: HTMLElement = courseEl.querySelector('.delete-button');
    button.click();
    expect(selectedCourseId).toBe(expectedCourse.id);
  });
});
