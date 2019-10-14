import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() searchValue: string;
  @Input() fieldDisabled: boolean;
  @Output() searchValueChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  showInput() {
    this.searchValueChange.emit(this.searchValue);
    this.searchValue = '';
  }

  onKey(event: KeyboardEvent, value: string) {
    this.searchValue = value;
    if (this.searchValue.length >= 3 || event.key === 'Backspace') {
      this.searchValueChange.emit(this.searchValue);
    }
  }

}
