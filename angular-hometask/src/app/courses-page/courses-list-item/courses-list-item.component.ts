import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CoursesListEntry } from '../courses-list-entry';
import { DurationDisplayPipe } from 'src/app/pipes/duration-display.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: CoursesListEntry;
  @Input() index: number;
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleDeleteClick() {
    this.deleteRequest.emit(this.course.id);
  }

  handleEditClick() {
    this.router.navigate(['courses', this.course.id]);
  }

}
