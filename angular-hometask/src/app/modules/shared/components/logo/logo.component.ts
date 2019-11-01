import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() login: string;
  @Output() logOut = new EventEmitter();

  constructor(private translate: TranslateService) {}

  handleLogout(): void {
    this.logOut.emit();
  }
}
