import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationInputComponent } from './duration-input.component';
import { NO_ERRORS_SCHEMA, EventEmitter, DebugElement, forwardRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DurationDisplayPipe } from 'src/app/modules/shared/pipes/duration-display.pipe';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { authorsListValidator } from '../../entities/validators/authors-list-size.directive';
import { By } from '@angular/platform-browser';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;
  let translate: TranslateService;
  let translateServiceStub: Partial<TranslateService>;
  let compDe: DebugElement;
  let compEl: HTMLElement;

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
      providers: [
        {provide: TranslateService, useValue: translateServiceStub},
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DurationInputComponent),
          multi: true
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationInputComponent);
    translate = TestBed.get(TranslateService);
    component = fixture.componentInstance;
    compDe = fixture.debugElement;
    compEl = compDe.nativeElement;
    component.name = new FormControl([],
      [
        Validators.required,
        authorsListValidator
      ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct locale on language change event', () => {
    const langEvent: LangChangeEvent = {
      lang: 'ru',
      translations: []
    };
    translate.onLangChange.emit(langEvent);
    expect(component.locale).toEqual('ru');

    langEvent.lang = 'en';
    translate.onLangChange.emit(langEvent);
    expect(component.locale).toEqual('en');
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

  it('should set disabled state in case of mistake', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
    component.setDisabledState(false);
    expect(component.disabled).toBeFalsy();
  });

  it('should call onChange when value is passed', () => {
    const spiedFn = spyOn<any>(component, 'onChange');
    const value = '1234567891';
    component.writeValue(value);
    expect(component.value).toBe(value);
    expect(spiedFn.calls.any()).toBeTruthy();
  });

  it('should write the number value if the incoming value can be parsed', () => {
    const value = '12345';
    component.writeValue(value);
    expect(component.value).toBe(value);
    expect(component.parsedValue).toBe(12345);
  });

  it('should not write the number value if the incoming value can not be parsed', () => {
    const value = null;
    component.writeValue(value);
    expect(component.value).toBe(value);
    expect(component.parsedValue).toBe(0);
  });

  it('should handle input', () => {
    const spiedFn = spyOn<any>(component, 'onTouched');
    const input = compDe.query(By.css('input'));
    const inputEl: HTMLInputElement = input.nativeElement;
    let value = '';
    inputEl.value = value;
    fixture.detectChanges();
    inputEl.dispatchEvent(new Event('input'));
    expect(component.value).toBe(value);
    expect(component.parsedValue).toBeFalsy();
    expect(spiedFn.calls.any()).toBeTruthy();

    value = '123';
    inputEl.value = value;
    fixture.detectChanges();
    inputEl.dispatchEvent(new Event('input'));
    expect(component.value).toBe(value);
    expect(component.parsedValue).toBe(123);
  });
});
