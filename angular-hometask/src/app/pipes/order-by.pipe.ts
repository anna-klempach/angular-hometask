import { Pipe, PipeTransform } from '@angular/core';
import { ICoursesListItem } from '../interfaces/courses-list-item.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: ICoursesListItem[]): ICoursesListItem[] {
    const sortedArray = value.slice(0);
    return sortedArray.sort((val1, val2) =>
      new Date(val2.creationDate).valueOf() - new Date(val1.creationDate).valueOf());
  }
}
