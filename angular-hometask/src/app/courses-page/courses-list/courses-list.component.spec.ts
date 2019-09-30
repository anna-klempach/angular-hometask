import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../courses.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoursesListItemComponent } from '../courses-list-item/courses-list-item.component';
import { By } from '@angular/platform-browser';
import { SortByPipe } from 'src/app/pipes/sort-by.pipe';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { DurationDisplayPipe } from 'src/app/pipes/duration-display.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesService: CoursesService;
  let coursesServiceStub: Partial<CoursesService>;
  let element: HTMLElement;

  beforeEach(async(() => {
    coursesServiceStub = {
      courses: [
        {
          id: 1,
          title: 'Hello!',
          creationDate: new Date(),
          duration: 30,
          description: 'A very interesting video',
          topRated: true,
        },
        {
          id: 2,
          title: 'Goodbye!',
          creationDate: new Date(),
          duration: 40,
          description: 'A very uninteresting video',
          topRated: false,
        }
      ],
      getCourses() { return this.courses; },
    };
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CoursesListItemComponent,
        SortByPipe,
        OrderByPipe,
        DurationDisplayPipe],
      providers: [{ provide: CoursesService, useValue: coursesServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    coursesService = fixture.debugElement.injector.get(CoursesService);
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have two items in a list', () => {
    const list = element.querySelector('.list');
    expect(list.children.length).toEqual(2);
  });
  it('should handle delete button click', () => {
    const button: HTMLElement = element.querySelector('.load-more-button');
    const loadMoreSpy = spyOn(component, 'handleLoad');
    button.click();
    fixture.detectChanges();
    expect(loadMoreSpy).toHaveBeenCalled();
  });
  it('should handle delete button click', () => {
    const item = fixture.debugElement.query(By.directive(CoursesListItemComponent));
    spyOn(component, 'deleteItem');
    const cmp = item.componentInstance;
    cmp.deleteRequest.emit(1);
    console.log(cmp.deleteRequest);
    fixture.detectChanges();
    component.deleteItem(1);
    expect(component.deleteItem).toHaveBeenCalledWith(1);
  });

  it('should sort element according to the keyword', () => {
    component.searchValue = 'hello';
    fixture.detectChanges();
    const list = element.querySelector('.list');
    expect(list.children.length).toEqual(1);
  });
  it('should not display list if keyword does not match', () => {
    component.searchValue = 'three';
    fixture.detectChanges();
    let list = element.querySelector('.list');
    expect(list).toBeFalsy();
    component.searchValue = 'o';
    fixture.detectChanges();
    list = element.querySelector('.list');
    expect(list).toBeTruthy();
    expect(list.children.length).toBe(2);
  });
});
