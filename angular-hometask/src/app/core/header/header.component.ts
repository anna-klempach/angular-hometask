import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated: boolean;
  login: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.login = this.authService.logIn();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  handleLogOut(): void {
    this.authService.logOut();
    this.login = '';
    // this.isAuthenticated = false;
    console.log('User has logged out');
  }

}
