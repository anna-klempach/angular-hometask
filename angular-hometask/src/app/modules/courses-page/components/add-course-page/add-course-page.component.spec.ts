import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCoursePageComponent } from './add-course-page.component';
import { DurationDisplayPipe } from 'src/app/modules/shared/pipes/duration-display.pipe';
import { NO_ERRORS_SCHEMA, EventEmitter, DebugElement, Component, forwardRef, Input, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormsModule } from '@angular/forms';
import { IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-date-input',
  template: `<div>
  <input [formControl]="name" [name]="addCourseForm?.controls?.creationDate" type="text" size="10">
  </div>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockDateInputComponent),
    multi: true
  }]
})
class MockDateInputComponent implements ControlValueAccessor {
  @Input() name: FormControl;
  public value: string;
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}

@Component({
  selector: 'app-duration-input',
  template: `<div>
  <input [formControl]="name" [name]="addCourseForm?.controls?.duration" type="text" size="10">
  </div>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockDurationInputComponent),
    multi: true
  }]
})
class MockDurationInputComponent implements ControlValueAccessor {
  @Input() name: FormControl;
  public value: string;
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}

@Component({
  selector: 'app-authors-input',
  template: `<div>
  <input [formControl]="name" [name]="addCourseForm?.controls?.authors" type="text" size="10">
  </div>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockAuthorsInputComponent),
    multi: true
  }]
})
class MockAuthorsInputComponent implements ControlValueAccessor {
  @Input() name: FormControl;
  public value: string;
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    this.value = outsideValue;
    this.onChange(this.value);
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;
  let mockTranslateService: Partial<TranslateService>;
  let translateService: TranslateService;
  let compDe: DebugElement;
  let compEl: HTMLElement;
  let store: MockStore<IAppState>;
  const initialState: IAppState = {
    courses: {
      courses: []
    }
  };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    mockTranslateService = {
      defaultLang: 'en',
      onLangChange: new EventEmitter<LangChangeEvent>(),
    };
    TestBed.configureTestingModule({
      declarations: [
        AddCoursePageComponent,
        DurationDisplayPipe,
        MockDateInputComponent,
        MockDurationInputComponent,
        MockAuthorsInputComponent
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        provideMockStore({ initialState }),
        { provide: TranslateService, useValue: mockTranslateService }
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursePageComponent);
    store = TestBed.get<Store<IAppState>>(Store);
    component = fixture.componentInstance;
    translateService = TestBed.get(TranslateService);
    compDe = fixture.debugElement;
    compEl = compDe.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add default language to translate parameters', () => {
    expect(component.translateParams.value).toEqual('Add course');
  });

  it('should change translate params due to the language change', () => {
    translateService.onLangChange.emit({ lang: 'ru', translations: [] });
    expect(component.translateParams.value).toEqual('Добавить курс');
  });
  it('should do nothing if event is emitted with default value', () => {
    translateService.onLangChange.emit({ lang: 'de', translations: [] });
    expect(component.translateParams.value).toEqual('Add course');
  });
  it('should change value on heading input change', () => {
    const titleInput = compDe.query(By.css('.title-input'));
    const titleInputEl = titleInput.nativeElement;

    expect(component.titleControl.value).toEqual('');
    expect(component.titleControl.valid).toBeFalsy();
    titleInputEl.value = 'Hello';
    fixture.detectChanges();
    titleInputEl.dispatchEvent(new Event('input'));

    expect(component.titleControl.value).toEqual('Hello');
    expect(component.titleControl.valid).toBeTruthy();
    titleInputEl.value = '111111111111111111111111111111111111111111111111111111'
      + '11111111111111111111111111111111111111111111111111111111111111111111111111';
    fixture.detectChanges();
    titleInputEl.dispatchEvent(new Event('input'));

    expect(component.titleControl.value).toEqual('111111111111111111111111111111111111111111111111111111'
      + '11111111111111111111111111111111111111111111111111111111111111111111111111');
    expect(component.titleControl.valid).toBeFalsy();
    titleInputEl.value = 'Title';
    fixture.detectChanges();
    titleInputEl.dispatchEvent(new Event('input'));
    expect(component.titleControl.value).toEqual('Title');
    expect(component.titleControl.valid).toBeTruthy();
  });

  it('should change value on description input change', () => {
    const descriptionInput = compDe.query(By.css('.description-input'));
    const descriptionInputEl = descriptionInput.nativeElement;

    expect(component.titleControl.value).toEqual('');
    expect(component.titleControl.valid).toBeFalsy();
    descriptionInputEl.value = 'Hello';
    fixture.detectChanges();
    descriptionInputEl.dispatchEvent(new Event('input'));

    expect(component.descriptionControl.value).toEqual('Hello');
    expect(component.descriptionControl.valid).toBeTruthy();
  });

  it('should call appropriate events on button clicks', () => {
    component.titleControl.setValue('Title');
    component.descriptionControl.setValue('Description');
    const saveSpy = spyOn(component, 'handleSave');
    spyOn(component, 'handleCancel');
    expect(component.creationDateControl.value).toEqual('');
    expect(component.durationControl.value).toBe('');
    expect(component.authorsControl.value).toEqual([]);
    expect(component.addCourseForm.valid).toBeFalsy();
    const button = compDe.query(By.css('.submit-button'));
    expect((button.nativeElement as HTMLButtonElement).disabled).toBeTruthy();

    component.durationControl.setValue('50');
    component.creationDateControl.setValue('11/12/2011');
    component.authorsControl.setValue(['Helen', 'John']);
    expect(component.addCourseForm.valid).toBeTruthy();
    fixture.detectChanges();
    expect((button.nativeElement as HTMLButtonElement).disabled).toBeFalsy();

    const submitButton = compDe.query(By.css('.submit-button'));
    const submitButtonEl = submitButton.nativeElement;
    submitButtonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(saveSpy).toHaveBeenCalled();

    const cancelButton = compDe.query(By.css('.cancel-button'));
    const cancelButtonEl = cancelButton.nativeElement;
    cancelButtonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.handleCancel).toHaveBeenCalled();
  });

  it('should apply appropriate changes on cancel button click', () => {
    component.titleControl.setValue('Title');
    component.descriptionControl.setValue('Description');
    component.durationControl.setValue('50');
    component.creationDateControl.setValue('11/12/2011');
    component.authorsControl.setValue(['Helen', 'John']);
    fixture.detectChanges();

    const cancelButton = compDe.query(By.css('.cancel-button'));
    const cancelButtonEl = cancelButton.nativeElement;
    cancelButtonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.editCourse).toBeFalsy();
    expect(routerMock.navigate).toHaveBeenCalledWith(['courses']);
  });

  it('should apply appropriate changes on save button click', () => {
    component.titleControl.setValue('Title');
    component.descriptionControl.setValue('Description');
    component.durationControl.setValue('50');
    component.creationDateControl.setValue('11/12/2011');
    component.authorsControl.setValue(['Helen', 'John']);
    fixture.detectChanges();

    const submitButton = compDe.query(By.css('.submit-button'));
    const submitButtonEl = submitButton.nativeElement;
    submitButtonEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.creationDateControl.value).toEqual(new Date('12/11/2011'));
    expect(component.editCourse.authors).toEqual(['Helen', 'John']);
    expect(routerMock.navigate).toHaveBeenCalledWith(['courses']);
  });
});
