import { Pipe, PipeTransform } from '@angular/core';
import { ICoursesListItem } from '../interfaces/courses-list-item.model';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: ICoursesListItem[], key: string): ICoursesListItem[] {
    return value.filter((val) => val.title.toUpperCase().includes(key.toUpperCase()));
  }
}
