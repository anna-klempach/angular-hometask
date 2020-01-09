import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inner-btn',
  templateUrl: './inner-btn.component.html',
  styleUrls: ['./inner-btn.component.scss']
})
export class InnerBtnComponent implements OnInit {
@Input() data: string;
  constructor() { }

  ngOnInit() {
  }

}
