import {
  Component, OnInit, OnChanges, OnDestroy, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, EventEmitter, Output
} from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-pick-a-boo',
  templateUrl: './pick-a-boo.component.html',
  styleUrls: ['./pick-a-boo.component.scss']
})
export class PickABooComponent implements
  OnInit, OnChanges, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Output() deleteRequest = new EventEmitter();
  constructor() {
    console.log('Constructor has been called.');
  }

  ngOnInit(): void {
    console.log('OnInit.');
  }

  ngOnChanges(): void {
    console.log('OnChanges.');
  }

  ngOnDestroy(): void {
    console.log('OnDestroy.');
  }

  ngDoCheck(): void {
    console.log('DoCheck.');
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit.');
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentchecked.');
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked');
  }

  ngAfterViewInit(): void {
    console.log('AfterviewInit.');
  }

  handleDelete(): void {
    this.deleteRequest.emit();
  }

}
