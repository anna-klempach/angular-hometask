import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsInputComponent } from './authors-input.component';
import { NO_ERRORS_SCHEMA, forwardRef, DebugElement, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IAppAuthorsState } from '../../state/manage-authors-list/manage-authors-list.selectors';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { authorsListValidator } from '../../entities/validators/authors-list-size.directive';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { IAuthor } from 'src/app/interfaces/author.model';

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
        MatAutocomplete],
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
    const authors = ['Jennyfer', 'Richard', 'Jessica', 'John', 'Petr']
    component.authors = [... authors];
    fixture.detectChanges();
    component.remove('Anna');
    expect(component.authors.length).toEqual(5);
    expect(component.authors).toEqual(authors);
  });
});
