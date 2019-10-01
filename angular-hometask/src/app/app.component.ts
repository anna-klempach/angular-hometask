import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hometask';
  pickABooActive = true;
  windowLocked = false;

  deleteItem() {
    this.pickABooActive = false;
  }

  handleWindowLock(value: boolean) { // will use later to lock the window
    this.windowLocked = value;
  }
}
