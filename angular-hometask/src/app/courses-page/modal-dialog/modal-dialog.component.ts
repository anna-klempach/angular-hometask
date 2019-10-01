import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  @Output() deleteItem = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  handleDeleteClick(value: boolean) {
    this.deleteItem.emit(value);
  }

}
