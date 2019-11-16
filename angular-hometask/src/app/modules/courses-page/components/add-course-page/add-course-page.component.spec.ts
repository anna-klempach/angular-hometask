import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursePageComponent } from './add-course-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DurationDisplayPipe } from 'src/app/modules/shared/pipes/duration-display.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;
  let mockTranslateService: Partial<TranslateService>;

  beforeEach(async(() => {
    mockTranslateService = {
      defaultLang: 'en',
      onLangChange: new EventEmitter<LangChangeEvent>(),
    };
    TestBed.configureTestingModule({
      declarations: [ AddCoursePageComponent, DurationDisplayPipe ],
      providers: [
        {provide: Router, useValue: {}},
        {provide: Store, usevalue: {}},
        {provide: TranslateService, useValue: mockTranslateService}
      ],
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
