import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CoursesListEntry } from '../../entities/classes/courses-list-entry';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // animation triggers go here
  ]
})
export class CoursesListItemComponent {
  public focusable: boolean;
  public focused: boolean;
  private locale = 'ru';
  @Input() course: CoursesListEntry;
  @Input() index: number;
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private translate: TranslateService) {
  }

  handleDeleteClick(): void {
    this.deleteRequest.emit(this.course.id);
  }

  handleEditClick(): void {
    this.router.navigate(['courses', this.course.id]);
  }

}
