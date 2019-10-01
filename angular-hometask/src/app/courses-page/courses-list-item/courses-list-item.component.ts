import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesListEntry } from '../courses-list-entry';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: CoursesListEntry;
  @Input() locked: boolean;
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  handleDeleteClick() {
    if (!this.locked) {
      this.deleteRequest.emit(this.course.id);
    }
  }

  handleEditClick() {
    console.log('Someone is trying to edit the video');
  }

}
