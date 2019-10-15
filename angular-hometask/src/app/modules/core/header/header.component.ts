import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login = '';
  isAuthentified: boolean;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.userInfo
      .subscribe((value: string) => this.login = value);
    this.authService.isAuthentified
      .subscribe((value: boolean) => this.isAuthentified = value);
  }

  handleLogOut(): void {
    this.authService.logOut()
      .subscribe({
        next: () => {
          this.router.navigate(['log-in']);
        }
      });
  }
}
