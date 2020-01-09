import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let element: HTMLElement;
  let mockRouter: Partial<Router>;

  beforeEach(async(() => {
    mockRouter = {
      events: new EventEmitter<any>(),
    };
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain "Courses" in its text', () => {
    expect(element.textContent).toBe('Courses');
  });
});
