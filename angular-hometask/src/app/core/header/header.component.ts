import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /* @Input() isAuthenticated: boolean;
  login: string; */
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    /* this.login = this.authService.getUserInfo();
    this.isAuthenticated = this.authService.isAuthenticated(); */
  }

  handleLogOut(): void {
    this.authService.logOut();
    // this.login = '';
    this.router.navigate(['log-in']);
  }

}
