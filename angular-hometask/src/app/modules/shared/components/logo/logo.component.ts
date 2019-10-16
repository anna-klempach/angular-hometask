import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() login: string;
  @Output() logOut = new EventEmitter();

  handleLogout(): void {
    this.logOut.emit();
  }
}
