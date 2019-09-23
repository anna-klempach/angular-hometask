import { Component, OnInit, Input } from '@angular/core';
import { CoursesListEntry } from '../courses-list-entry';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: CoursesListEntry;
  constructor() { }

  ngOnInit() {
  }

}
