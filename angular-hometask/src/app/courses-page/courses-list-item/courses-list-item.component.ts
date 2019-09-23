import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesListEntry } from '../courses-list-entry';
import { CoursesListItem } from '../courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})
export class CoursesListItemComponent implements OnInit{
  @Input() course: CoursesListEntry;
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  hanleDeleteClick() {
    this.deleteRequest.emit(this.course.id);
  }

}
