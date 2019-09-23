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

  ngOnInit() {
    console.log('OnInit.');
  }

  ngOnChanges() {
    console.log('OnChanges.');
  }

  ngOnDestroy() {
    console.log('OnDestroy.');
  }

  ngDoCheck() {
    console.log('DoCheck.');
  }

  ngAfterContentInit() {
    console.log('AfterContentInit.');
  }

  ngAfterContentChecked() {
    console.log('AfterContentchecked.');
  }

  ngAfterViewChecked() {
    console.log('AfterViewChecked');
  }

  ngAfterViewInit() {
    console.log('AfterviewInit.');
  }

  handleDelete() {
    this.deleteRequest.emit();
  }

}
