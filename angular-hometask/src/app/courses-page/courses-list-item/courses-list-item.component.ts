import { Component, OnInit } from '@angular/core';
import { CoursesListItem } from '../courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss']
})
export class CoursesListItemComponent implements OnInit, CoursesListItem {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  descriprion: string;
  constructor() { }

  ngOnInit() {
  }

}
