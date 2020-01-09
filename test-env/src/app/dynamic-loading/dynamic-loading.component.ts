import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { TargetDirective } from '../target.directive';
import { FirstComponent } from '../first/first.component';
import { SecondComponent } from '../second/second.component';

@Component({
  selector: 'app-dynamic-loading',
  templateUrl: './dynamic-loading.component.html',
  styleUrls: ['./dynamic-loading.component.scss']
})
export class DynamicLoadingComponent implements OnInit {

  @ViewChild(TargetDirective, { static: true }) target: TargetDirective;

  private currentComp: any = FirstComponent;

  constructor(private resolver: ComponentFactoryResolver) { }
  ngOnInit(): void {
    this.loadComponent(this.currentComp);
    setInterval(() => {
      this.currentComp = this.currentComp.name === 'FirstComponent'
        ? SecondComponent
        : FirstComponent;
    }, 2000);
  }
  switchView() {
    this.currentComp = this.currentComp.name === 'FirstComponent'
      ? SecondComponent
      : FirstComponent;
    this.loadComponent(this.currentComp);
  }

  loadComponent(currentComp: any) {
    const factory = this.resolver.resolveComponentFactory(currentComp);
    const viewContainerRef = this.target.viewContainerRef;
    viewContainerRef.clear();
    const compRef = viewContainerRef.createComponent(factory);
    (compRef.instance as { data: string }).data = `${this.currentComp.name} works`;
  }
}
