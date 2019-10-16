import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private emailValue = '';
  private passwordValue = '';
  constructor(private authService: AuthService, private router: Router) { }

  handleEmailInput(value: string): void {
    this.emailValue = value;
  }

  handlePasswordInput(value: string): void {
    this.passwordValue = value;
  }

  handleLogin(): void {
    this.authService.logIn(this.emailValue, this.passwordValue)
      .subscribe((res) => {
        if (res.accessToken) {
          this.router.navigate(['courses']);
        }
      });
  }

  handleRegister(): void {
    this.authService.registerNewUser(this.emailValue, this.passwordValue)
      .subscribe((res) => {
        if (res.accessToken) {
          this.router.navigate(['courses']);
        }
      });
  }
}
