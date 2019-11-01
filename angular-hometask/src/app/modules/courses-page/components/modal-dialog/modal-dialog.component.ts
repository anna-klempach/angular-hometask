import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent{
  @Output() deleteItem = new EventEmitter<boolean>();

  constructor( private translate: TranslateService) { }

  handleDeleteClick(value: boolean): void {
    this.deleteItem.emit(value);
  }

}
