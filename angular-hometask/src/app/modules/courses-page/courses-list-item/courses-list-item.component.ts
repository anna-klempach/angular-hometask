import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CoursesListEntry } from '../courses-list-entry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListItemComponent {
  @Input() course: CoursesListEntry;
  @Input() index: number;
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();
  constructor(private router: Router) { }

  handleDeleteClick(): void {
    this.deleteRequest.emit(this.course.id);
  }

  handleEditClick(): void {
    this.router.navigate(['courses', this.course.id]);
  }

}
