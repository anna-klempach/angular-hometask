import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputComponent } from './date-input.component';
import { NO_ERRORS_SCHEMA, DebugElement, EventEmitter, forwardRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { dateValidator } from '../../entities/validators/date-validator.directive';
import { stringify } from 'querystring';
import { By } from '@angular/platform-browser';

describe('DateInputComponent', () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;
  let mockTranslateService: Partial<TranslateService>;
  let compDe: DebugElement;
  let compEl: HTMLElement;

  beforeEach(async(() => {
    mockTranslateService = {
      defaultLang: 'en',
      onLangChange: new EventEmitter<LangChangeEvent>(),
    };
    TestBed.configureTestingModule({
      declarations: [ DateInputComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: TranslateService, useValue: mockTranslateService},
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DateInputComponent),
          multi: true
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    component = fixture.componentInstance;
    compDe = fixture.debugElement;
    compEl = compDe.nativeElement;
    component.name = new FormControl([],
      [
        Validators.required,
        dateValidator
      ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid with correct date format', () => {
    component.name.setValue('11/11/2011');
    expect(component.name.valid).toBeTruthy();
  });

  it('should be invalid with incorrect date format', () => {
    component.name.setValue('55/55/8974');
    expect(component.name.valid).toBeFalsy();
  });

  it('should be invalid when empty', () => {
    component.name.setValue('');
    expect(component.name.valid).toBeFalsy();
  });

  it('should register onChange function', () => {
    const fnToRegister = (x: number) => x + 1;
    component.registerOnChange(fnToRegister);
    expect(component.OnChange).toEqual(fnToRegister);
  });

  it('should register onTouched function', () => {
    const fnToRegister = () => 1;
    component.registerOnTouched(fnToRegister);
    expect(component.OnTouched).toEqual(fnToRegister);
  });

  it('should be invalid when empty', () => {
    component.name.setValue('');
    expect(component.name.valid).toBeFalsy();
  });

  it('should set disabled state in case of mistake', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
    component.setDisabledState(false);
    expect(component.disabled).toBeFalsy();
  });

  it('should call onChange when value length is 10', () => {
    const spiedFn = spyOn<any>(component, 'onChange');
    const value = '1234567891';
    component.writeValue(value);
    expect(component.value).toBe(value);
    expect(spiedFn.calls.any()).toBeTruthy();
  });

  it('should not call onChange when value is not 10', () => {
    const spiedFn = spyOn<any>(component, 'onChange');
    const value = '123';
    component.writeValue(value);
    expect(component.value).toBe(value);
    expect(spiedFn.calls.any()).toBeFalsy();
  });

  it('should not call onChange when component value is falsy', () => {
    const spiedFn = spyOn<any>(component, 'onChange');
    const value = null;
    component.writeValue(value);
    expect(component.value).toBeFalsy();
    expect(spiedFn.calls.any()).toBeFalsy();
  });

  it('should handle input properly', () => {
    const spiedFn = spyOn<any>(component, 'onTouched');
    const input = compDe.query(By.css('input'));
    const inputEl: HTMLInputElement = input.nativeElement;
    let value = '';
    inputEl.value = value;
    fixture.detectChanges();
    inputEl.dispatchEvent(new Event('input'));
    expect(component.value).toBe(value);
    expect(spiedFn.calls.any()).toBeTruthy();

    value = '123';
    inputEl.value = value;
    fixture.detectChanges();
    inputEl.dispatchEvent(new Event('input'));
    expect(component.value).toBe(value);
  });
});
