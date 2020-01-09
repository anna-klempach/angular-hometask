import { Component, OnInit, Input } from '@angular/core';
import { CustomerData } from '../database/database.component';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit {
  @Input() customer: CustomerData;
  constructor() { }

  ngOnInit() {
  }

}
