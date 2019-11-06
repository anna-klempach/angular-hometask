import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputComponent } from './date-input.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DateInputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateInputComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
