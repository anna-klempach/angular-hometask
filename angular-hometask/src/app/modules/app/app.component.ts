import { Component, Input } from '@angular/core';
import { LoadingBlockService } from '../../services/loading-block/loading-block.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'angular-hometask';
  public displayed: boolean;
  public pickABooActive = false;

  constructor(private loadingService: LoadingBlockService) {
    this.loadingService.displayed
      .subscribe((value: boolean) => this.displayed = value);
  }

  deleteItem(): void {
    this.pickABooActive = false;
  }
}
