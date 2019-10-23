import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, OnInit, forwardRef, ɵConsole } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthorsService } from '../../services/authors/authors.service';
import { IAppAuthorsState, selectAuthors } from '../../state/manage-authors-list/manage-authors-list.selectors';
import { Store, select } from '@ngrx/store';
import { IAuthor } from 'src/app/interfaces/author.model';
import { loadAuthors } from '../../state/manage-authors-list/manage-authors-list.actions';

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
  public authors: string[];
  public allAuthors$: Observable<string[]> = this.store.pipe(select(selectAuthors));
  public filteredAuthors: string[];
  public disabled = false;
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor(
    private authorsService: AuthorsService,
    private store: Store<IAppAuthorsState>
  ) { }

  ngOnInit() {
    this.allAuthors$.subscribe(res => this.filteredAuthors = res);
    this.store.dispatch(loadAuthors());
  }

  handleInput(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    this.filteredAuthors = this.filteredAuthors.filter((author) => author.toLowerCase().includes(value.toLowerCase()));
    this.onChange(this.authors);
    console.log(this.name);
    /* console.log(this.filteredAuthors);
    if (this.filteredAuthors.length === 0) {
      this.filteredAuthors = this.allAuthors.slice();
    } */
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(outsideValue: string) {
    // this.onChange(this.allAuthors);
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
        // this.allAuthors.push(value.trim());
        this.onChange(this.authors);
      }
      if (input) {
        input.value = '';
      }
      // this.name.setValue(null);
    }
  }

  remove(author: string): void {
    const index = this.authors.indexOf(author);

    if (index >= 0) {
      this.authors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.authors.push(event.option.viewValue);
    this.authorInput.nativeElement.value = '';
    // this.name.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.filteredAuthors.filter(author => author.toLowerCase().indexOf(filterValue) === 0);
  }
}

