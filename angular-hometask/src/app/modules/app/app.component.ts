import { Component, Input } from '@angular/core';
import { LoadingBlockService } from '../../services/loading-block/loading-block.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-hometask';
  displayed: boolean;
  pickABooActive = false;

  constructor(private loadingService: LoadingBlockService) {
    this.loadingService.displayed
      .subscribe((value: boolean) => this.displayed = value);
  }

  deleteItem() {
    this.pickABooActive = false;
  }
}
