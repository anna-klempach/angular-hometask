import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsInputComponent } from './authors-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthorsInputComponent', () => {
  let component: AuthorsInputComponent;
  let fixture: ComponentFixture<AuthorsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorsInputComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
