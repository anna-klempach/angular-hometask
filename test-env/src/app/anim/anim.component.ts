import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-anim',
  templateUrl: './anim.component.html',
  styleUrls: ['./anim.component.scss']
})
export class AnimComponent {

@ViewChild('anim', {static: false}) box: ElementRef;

  constructor(private renderer: Renderer2) { }


  public toggleAnimation(): void {
    let start;
    let stopId;
    let progress;
    let toggle = false;
    const element: HTMLElement = this.box.nativeElement;
    const renderer = this.renderer;
    const step = (timestamp) => {
      if (!start || progress > 400) {
        start = timestamp;
      }
      progress = (timestamp - start) / 100 + 50;
      renderer.setStyle(element, 'top', `${progress}px`);
      stopId = window.requestAnimationFrame(step);
    };
    if (!toggle) {
      toggle = true;
      window.requestAnimationFrame(step);
    } else {
      toggle = false;
      cancelAnimationFrame(stopId);
    }
  }

}
