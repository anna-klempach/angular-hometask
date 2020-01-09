import { Directive, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCoursePlateBorder]'
})
export class CoursePlateBorderDirective implements OnChanges {

  @Input('appCoursePlateBorder') creationDate: Date;

  constructor(public el: ElementRef, private render: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: SimpleChange = changes.creationDate;
    if (change.currentValue !== change.previousValue) {
      const currentDate = Date.now() / 1000 / 60 / 60 / 24;
      const currCreationDate = new Date(this.creationDate).valueOf() / 1000 / 60 / 60 / 24;
      if (currCreationDate < currentDate && currCreationDate >= currentDate - 14) {
        this.render.setStyle(this.el.nativeElement.firstChild.children[0], 'border', '0.1rem solid rgb(77, 201, 160)');
      } else if (currCreationDate > currentDate) {
        this.render.setStyle(this.el.nativeElement.firstChild.children[0], 'border', '0.1rem solid #374785');
      }
    }
  }
}
