import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, OnInit, forwardRef, ɵConsole } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { IAppAuthorsState, selectAuthors } from '../../state/manage-authors-list/manage-authors-list.selectors';
import { Store, select } from '@ngrx/store';
import { loadAuthors, addAuthor } from '../../state/manage-authors-list/manage-authors-list.actions';
import { IValueCheck } from 'src/app/interfaces/value-check.model';
import { IAuthor } from 'src/app/interfaces/author.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-authors-input',
  templateUrl: 'authors-input.component.html',
  styleUrls: ['authors-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsInputComponent),
    multi: true
  }]
})
export class AuthorsInputComponent implements OnInit, ControlValueAccessor {
  @Input() name: FormControl;
  @Input() errorStateMatcher: ErrorStateMatcher;

  @ViewChild('authorInput', { static: false }) authorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public authors: string[] = [];
  public allAuthors$: Observable<string[]> = this.store.pipe(select(selectAuthors));
  public filteredAuthors: string[] = [];
  public allAuthors: string[];
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };
  public get OnChange() {return this.onChange; }
  public get OnTouched() {return this.onTouched; }

  constructor(
    private store: Store<IAppAuthorsState>,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadAuthors());
    this.allAuthors$.subscribe(res => {
      this.allAuthors = res;
      this.filteredAuthors = [...this.allAuthors];
      this.filterCourses();
    });
  }

  handleInput(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.filteredAuthors = this.filteredAuthors.filter((author) => author.toLowerCase().includes(value.toLowerCase()));
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: string[]) {
    this.authors = [...value];
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.authors.push(value.trim());
        this.store.dispatch(addAuthor({ author: { name: value, id: new Date().valueOf() } }));
        this.onChange(this.authors);
      }
      if (input) {
        input.value = '';
      }
    }
  }

  remove(author: string): void {
    const index = this.authors.indexOf(author);

    if (index >= 0) {
      this.authors.splice(index, 1);
      this.filteredAuthors = [...this.allAuthors];
      this.filterCourses();
    }
    this.onChange(this.authors);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    this.authors.push(value);
    const filterValue = value.toLowerCase();
    this.filteredAuthors = this.allAuthors.filter(author => author.toLowerCase().indexOf(filterValue) !== 0);
    this.filterCourses();
    this.authorInput.nativeElement.value = '';
    this.onChange(this.authors);
  }

  private checkValue(valueToCheck: string): IValueCheck {
    let present: boolean;
    let selected: boolean;
    let value: string;
    const filteredValues = this.allAuthors.filter(author => author.toLowerCase() === valueToCheck.toLowerCase());
    if (filteredValues.length === 1) {
      present =  true;
      value =  filteredValues[0];
    } else if (filteredValues.length > 1) {
      present =  true;
      const filteredIndex = filteredValues.indexOf(value);
      if (filteredIndex > 0) {
        value = filteredValues[filteredIndex];
      } else {
        value = filteredValues[0];
      }
    } else {
      present = false;
      value = valueToCheck;
    }
    if (this.authors.filter(author => author.toLowerCase() === valueToCheck.toLowerCase()).length > 0) {
      selected = true;
    } else {
      selected = false;
    }
    return {present, selected, value};
  }

  private filterCourses(): void {
    this.filteredAuthors = this.filteredAuthors.filter((author) => this.authors.indexOf(author) < 0);
  }
}

