import { Injectable } from '@angular/core';
import { CoursesListItem } from './courses-list-item.model';
import { CoursesListEntry } from './courses-list-entry';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): CoursesListEntry[] {
    return [
      new CoursesListEntry(1, 'Video One', new Date(), 20, 'A very interesting video about a very importatnt topic.'),
      new CoursesListEntry(2, 'Video Two', new Date(), 40, 'Another very interesting video about an even more interesting topic.'),
      new CoursesListEntry(3, 'Video Three', new Date(),
        15, 'Not a very interesting video but the topic is extremely important and you have to watch it, thanks God it is quite short.'),
      new CoursesListEntry(4, 'Video Four', new Date(), 50, 'An absolutely useless video, if you do not want you may not watch it.'),
    ];
  }
}
