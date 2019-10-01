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
    console.log(`Current search value taken from event binding within the component is ${this.searchValue}.`);
    this.searchValueChange.emit(this.searchValue);
    this.searchValue = '';
  }

  onKey(value: string) {
    this.searchValue = value;
  }

}
