import { Pipe, PipeTransform } from '@angular/core';
import { CoursesListItem } from '../courses-page/courses-list-item.model';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: CoursesListItem[], key: string): CoursesListItem[] {
    return value.filter((val) => val.title.toUpperCase().includes(key.toUpperCase()));
  }
}
