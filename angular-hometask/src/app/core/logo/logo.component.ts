import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() login: string;
  @Output() logOut = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleLogout(): void {
    this.logOut.emit();
  }

}
