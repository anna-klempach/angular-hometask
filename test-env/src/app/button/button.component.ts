import { Component, AfterContentInit, ContentChild, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterContentInit {
  @ContentChild('content', {static: false}) text: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterContentInit(): void {
    this.renderer.setStyle(this.text.nativeElement, 'color', 'red');
  }

}
