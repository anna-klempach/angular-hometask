import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursePageComponent } from './add-course-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DurationDisplayPipe } from 'src/app/modules/shared/pipes/duration-display.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoursePageComponent, DurationDisplayPipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
