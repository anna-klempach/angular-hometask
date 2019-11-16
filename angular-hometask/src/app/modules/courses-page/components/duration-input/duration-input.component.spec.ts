import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationInputComponent } from './duration-input.component';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DurationDisplayPipe } from 'src/app/modules/shared/pipes/duration-display.pipe';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;
  let translateServiceStub: Partial<TranslateService>;

  beforeEach(async(() => {
    translateServiceStub = {
      defaultLang: 'en',
      setDefaultLang(lang: string): void {
        this.defaultLang = lang;
      },
      onLangChange: new EventEmitter<LangChangeEvent>(),
    };
    TestBed.configureTestingModule({
      declarations: [DurationInputComponent, DurationDisplayPipe],
      imports: [ReactiveFormsModule],
      providers: [{provide: TranslateService, useValue: translateServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
