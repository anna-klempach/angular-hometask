import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  emailValue = '';
  passwordValue = '';
  constructor() { }

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

}
