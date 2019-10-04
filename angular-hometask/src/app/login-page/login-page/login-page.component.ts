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
    console.log('Email', this.emailValue);
  }

  handlePasswordInput(value: string) {
    this.passwordValue = value;
    console.log('Password', this.passwordValue);
  }

  handleLogin() {
    this.authService.logIn(this.emailValue, this.passwordValue);
    this.router.navigate(['courses']);
  }

}
