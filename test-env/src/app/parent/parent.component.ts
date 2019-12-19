import {
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { InnerBtnComponent } from '../inner-btn/inner-btn.component';
import { FirstComponent } from '../first/first.component';
import { SecondComponent } from '../second/second.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent implements AfterViewInit {
  constructor(private resolver: ComponentFactoryResolver) { }
  @ViewChild('vcr', { read: ViewContainerRef, static: false }) vcr: ViewContainerRef;
  private currentComp: any = FirstComponent;

  switchView() {
    this.currentComp = this.currentComp.name === 'FirstComponent'
      ? SecondComponent
      : this.currentComp.name === 'SecondComponent'
        ? InnerBtnComponent
        : FirstComponent;
    this.loadComponent(this.currentComp);
  }

  loadComponent(currentComp: any) {
    const factory = this.resolver.resolveComponentFactory(currentComp);
    this.vcr.clear();
    const compRef = this.vcr.createComponent(factory);
    (compRef.instance as { data: string }).data = `${this.currentComp.name} works`;
  }

  ngAfterViewInit(): void {
    this.loadComponent(this.currentComp);
  }

}


