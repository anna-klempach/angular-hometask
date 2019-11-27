import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsInputComponent } from './authors-input.component';
import { NO_ERRORS_SCHEMA, forwardRef, DebugElement, EventEmitter, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IAppAuthorsState } from '../../state/manage-authors-list/manage-authors-list.selectors';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { authorsListValidator } from '../../entities/validators/authors-list-size.directive';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatOption } from '@angular/material/core';

interface PartialOptionSelectEvent {
  option: Partial<MatOption>;
}

describe('AuthorsInputComponent', () => {
  let component: AuthorsInputComponent;
  let fixture: ComponentFixture<AuthorsInputComponent>;
  let mockTranslateService: Partial<TranslateService>;
  let compDe: DebugElement;
  let compEl: HTMLElement;
  let store: MockStore<IAppAuthorsState>;
  const initialState: IAppAuthorsState = {
    authors: {
      authors: [
        {
          name: 'Helen',
          id: 12345
        },
        {
          name: 'Jack',
          id: 54321
        },
        {
          name: 'John',
          id: 34526
        }
      ]
    }
  };

  beforeEach(async(() => {
    mockTranslateService = {
      defaultLang: 'en',
      onLangChange: new EventEmitter<LangChangeEvent>(),
    };
    TestBed.configureTestingModule({
      declarations: [
        AuthorsInputComponent,
        MatAutocomplete
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AuthorsInputComponent),
          multi: true
        },
        provideMockStore({ initialState }),
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsInputComponent);
    store = TestBed.get<Store<IAppAuthorsState>>(Store);
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

  it('should filter authors according to input', () => {
    const input = compDe.query(By.css('.author-input'));
    const inputEl: HTMLInputElement = input.nativeElement;
    inputEl.value = 'Jack';
    fixture.detectChanges();
    inputEl.dispatchEvent(new Event('input'));
    const result: string[] = ['Jack'];
    expect(component.filteredAuthors).toEqual(result);
  });

  it('should register onChange function', () => {
    const fnToRegister = () => 1;
    component.registerOnChange(fnToRegister);
    expect(component.OnChange).toEqual(fnToRegister);
  });

  it('should register onTouched function', () => {
    const fnToRegister = () => 1;
    component.registerOnTouched(fnToRegister);
    expect(component.OnTouched).toEqual(fnToRegister);
  });

  it('should rewrite the existing authors array', () => {
    const authors = ['Jessica', 'John', 'Petr'];
    component.authors = ['Jennyfer', 'Richard'];
    component.writeValue(authors);
    expect(component.authors).toEqual(authors);
  });

  it('should remove an author from the array', () => {
    component.authors = ['Jennyfer', 'Richard', 'Jessica', 'John', 'Petr'];
    fixture.detectChanges();
    const authorChips = compDe.queryAll(By.css('.author-chip'));
    const chipToRemove = authorChips[0];
    const chipToRemoveElement = chipToRemove.nativeElement;
    chipToRemoveElement.dispatchEvent(new Event('removed'));
    expect(component.authors.length).toEqual(4);
    expect(component.authors.includes('Jennyfer')).toBeFalsy();
  });

  it('should not remove an author from the array in case of mistake', () => {
    const authors = ['Jennyfer', 'Richard', 'Jessica', 'John', 'Petr'];
    component.authors = [... authors];
    fixture.detectChanges();
    component.remove('Anna');
    expect(component.authors.length).toEqual(5);
    expect(component.authors).toEqual(authors);
  });

  it('should set disabled state in case of mistake', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
    component.setDisabledState(false);
    expect(component.disabled).toBeFalsy();
  });

  it('should call add method on MatChipInputEvent', () => {
    const input = compDe.query(By.css('.author-input'));
    const inputEl: HTMLInputElement = input.nativeElement;
    spyOn(component, 'add');
    inputEl.dispatchEvent(new Event('matChipInputTokenEnd'));
    expect(component.add).toHaveBeenCalled();
  });

  it('should add author on input', () => {
    const authors = ['Jennyfer', 'Richard', 'Jessica', 'John', 'Petr'];
    component.authors = [... authors];
    const input = compDe.query(By.css('.author-input'));

    const inputEvent: Partial<MatChipInputEvent> = {
      input: undefined,
      value: 'Jack'
    };
    let result: string[] = [...authors, 'Jack'];
    component.add(inputEvent as MatChipInputEvent);
    expect(component.authors).toEqual(result);

    const inputEl: HTMLInputElement = input.nativeElement;
    inputEl.value = 'Helen';
    fixture.detectChanges();
    expect(inputEl.value).toBeTruthy();
    inputEvent.input = inputEl;
    inputEvent.value = 'Helen';
    component.add(inputEvent as MatChipInputEvent);
    result = [...result, 'Helen'];

    expect(component.authors).toEqual(result);
    expect(inputEl.value).toBeFalsy();

    inputEvent.value = null;
    component.add(inputEvent as MatChipInputEvent);
    expect(component.authors).toEqual(result);
  });

  it('should call selected method on option select', () => {
    const autocomplete = compDe.query(By.css('mat-autocomplete'));
    const autocompleteEl = autocomplete.nativeElement;
    spyOn(component, 'selected');
    autocompleteEl.dispatchEvent(new Event('optionSelected'));
    expect(component.selected).toHaveBeenCalled();
  });

  it('should add selected option to autors list', () => {
    const authors = ['Jennyfer', 'Richard', 'Jessica', 'John', 'Petr'];
    const filteredAuthors = ['Helen', 'Barbara'];
    component.authors = [... authors];
    component.filteredAuthors = [...filteredAuthors];
    component.allAuthors = [...authors, ...filteredAuthors];
    fixture.detectChanges();
    const optionSelectEvent: PartialOptionSelectEvent = {
      option: {
        viewValue: 'Barbara',
      }
    };
    component.selected(optionSelectEvent as MatAutocompleteSelectedEvent);
    const result = [...authors, 'Barbara'];
    expect(component.authors).toEqual(result);
    expect(component.filteredAuthors).toEqual(['Helen']);
  });

  it('should be invalid when list is empty', () => {
    component.name.setValue([]);
    fixture.detectChanges();
    expect(component.name.valid).toBeFalsy();
  });

  it('should be valid when list is not empty', () => {
    component.name.setValue(['Helen']);
    fixture.detectChanges();
    expect(component.name.valid).toBeTruthy();
  });
});
