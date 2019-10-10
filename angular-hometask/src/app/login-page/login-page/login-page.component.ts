import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  emailValue = '';
  passwordValue = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  handleEmailInput(value: string) {
    this.emailValue = value;
  }

  handlePasswordInput(value: string) {
    this.passwordValue = value;
  }

  handleLogin() {
    this.authService.logIn(this.emailValue, this.passwordValue);
    this.router.navigate(['courses']);
  }

  handleRegister() {
    this.authService.registerNewUser(this.emailValue, this.passwordValue);
    this.router.navigate(['courses']);
  }

}
