import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appError]'
})
export class ErrorDirective implements OnChanges {

  @Input('appError') hasError: boolean;

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.hasError) {
      this.renderer.setStyle(this.elemRef.nativeElement, 'border', '1px solid red');
    } else {
      this.renderer.setStyle(this.elemRef.nativeElement, 'border', '1px solid black');
    }
  }

}
