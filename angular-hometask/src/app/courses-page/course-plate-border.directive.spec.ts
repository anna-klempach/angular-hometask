import { CoursePlateBorderDirective } from './course-plate-border.directive';
import { Component, DebugElement, Input, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesListItem } from './courses-list-item.model';

@Component({
  template: `
  <h2 [appCoursePlateBorder]="dateBefore">Without border(Default)</h2>
  <h2 [appCoursePlateBorder]="dateRecent">Green border(Fresh course)</h2>
  <h2 [appCoursePlateBorder]="dateAfter">Blue border(Upcoming course)</h2>
  <h2>No Highlight</h2>`
})
class TestComponent {
  public dateBefore = new Date('June 12, 2018 02:24:00');
  public dateRecent = new Date('September 29, 2019 14:24:00');
  public dateAfter = new Date('October 30, 2100 14:24:00');
}

const fixture = TestBed.configureTestingModule({ // Why when i do it 'before each' all the other tests fail?
  declarations: [CoursePlateBorderDirective, TestComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
  .createComponent(TestComponent);
fixture.detectChanges();

const des = fixture.debugElement.queryAll(By.directive(CoursePlateBorderDirective));

describe('CoursePlateBorderDirective', () => {
  it('should create an instance', () => {
    const directive = new CoursePlateBorderDirective(fixture.nativeElement);
    expect(directive).toBeTruthy();
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should not color 1st <h2> border', () => {
    const bdColor = des[0].nativeElement.style.borderColor;
    expect(bdColor).toBe('');
  });
  it('should color 2nd <h2> border green', () => {
    const bdColor = des[1].nativeElement.style.borderColor;
    expect(bdColor).toBe('green');
  });
  it('should color 3rd <h2> border blue', () => {
    const bdColor = des[2].nativeElement.style.borderColor;
    expect(bdColor).toBe('blue');
  });
  it('bare <h2> should not have a customProperty', () => {
    expect(fixture.debugElement.query(By.css('h2:not([coursePlateBorder])')).nativeElement.style.borderColor).toBe('');
  });
});
