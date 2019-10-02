import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hometask';
  pickABooActive = true;

  deleteItem() {
    this.pickABooActive = false;
  }
}
