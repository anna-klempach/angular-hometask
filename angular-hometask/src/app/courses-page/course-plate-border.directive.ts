import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { CoursesListItem } from './courses-list-item.model';

@Directive({
  selector: '[appCoursePlateBorder]'
})
export class CoursePlateBorderDirective implements OnChanges {

  @Input('appCoursePlateBorder') creationDate: Date;

  constructor(public el: ElementRef) {
  }

  ngOnChanges() {
    const currentDate = Date.now() / 1000 / 60 / 60 / 24;
    const currCreationDate = new Date(this.creationDate).valueOf() / 1000 / 60 / 60 / 24;
    if (currCreationDate < currentDate && currCreationDate >= currentDate - 14) {
      this.el.nativeElement.style.border = '5px solid green';
    } else if (currCreationDate > currentDate) {
      this.el.nativeElement.style.border = '5px solid blue';
    }
  }

}
