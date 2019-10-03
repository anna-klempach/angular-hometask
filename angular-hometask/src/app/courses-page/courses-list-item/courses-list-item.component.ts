import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CoursesListEntry } from '../courses-list-entry';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: CoursesListEntry;
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  handleDeleteClick() {
    this.deleteRequest.emit(this.course.id);
  }

  handleEditClick() {
    console.log('Someone is trying to edit the video');
  }

}
