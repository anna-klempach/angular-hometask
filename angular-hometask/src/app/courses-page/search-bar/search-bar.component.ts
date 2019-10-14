import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnChanges {
  @Input() searchValue: string;
  @Input() fieldDisabled: boolean;
  @Output() searchValueChange = new EventEmitter<string>();
  constructor(private coursesService: CoursesService) { }


  ngOnInit() {
  }

  ngOnChanges() {
    const searchBox = document.querySelector('.search-bar');
    console.log('I am here');
    const typeahead = fromEvent(searchBox, 'keyup')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(10),
        distinctUntilChanged()
      );

    typeahead.subscribe((data) => {
      this.searchValueChange.emit(data);
    });

  }
}
