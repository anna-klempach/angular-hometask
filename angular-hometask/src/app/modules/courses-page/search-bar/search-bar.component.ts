import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { fromEvent, Observable, BehaviorSubject, observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  private changedValue$ = new BehaviorSubject('');
  @Input() searchValue: string;
  @Input() fieldDisabled: boolean;
  @Output() searchValueChange = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit() {
    this.changedValue$
      .pipe(debounceTime(500))
      .subscribe(data => {
        data
          ? this.searchValueChange.emit(data)
          : this.searchValueChange.emit('');
      });
  }

  handleInputChange(e: KeyboardEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (value.length > 2 || e.key === 'Backspace') {
      this.changedValue$.next(value);
    }
  }
}
