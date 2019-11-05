import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { LoadingBlockService } from './services/loading-block/loading-block.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'angular-hometask';
  public displayed: boolean;

  constructor(
    private loadingService: LoadingBlockService,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService
    ) {
this.translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.loadingService.displayed
      .subscribe((value: boolean) => {
        this.displayed = value;
        this.cdRef.detectChanges();
      });
  }
}
