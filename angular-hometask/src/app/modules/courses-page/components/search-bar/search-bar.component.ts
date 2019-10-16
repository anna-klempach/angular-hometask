import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() searchValue: string;
  @Input() fieldDisabled: boolean;
  @Output() searchValueChange = new EventEmitter<string>();
  private changedValue$ = new BehaviorSubject('');
  private unsubscribed = true;
  constructor() {
  }

  ngOnInit(): void {
  }

  handleInputChange(e: KeyboardEvent): void {
    if (this.unsubscribed) {
      this.changedValue$
        .pipe(debounceTime(500))
        .subscribe(data =>
          data
            ? this.searchValueChange.emit(data)
            : this.searchValueChange.emit(''));
      this.unsubscribed = false;
    }
    const value = (e.target as HTMLInputElement).value;
    if (value.length > 2 || e.key === 'Backspace' || e.key === 'Delete') {
      this.changedValue$.next(value);
    }
  }
}
