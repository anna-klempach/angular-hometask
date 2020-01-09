import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from 'src/app/modules/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '../courses-page/entities/classes/error-state-matcher';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public loginForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(7)
      ])
  });
  public matcher = new CustomErrorStateMatcher();
  private emailValue = '';
  private passwordValue = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService) { }

  handleEmailInput(value: string): void {
    this.emailValue = value;
  }

  handlePasswordInput(value: string): void {
    this.passwordValue = value;
  }

  handleLogin(): void {
    this.authService.logIn(this.emailValue, this.passwordValue)
    .pipe(
      filter((res: UserInfo) => !!res)
      )
    .subscribe(() => this.router.navigate(['courses']));
  }

  handleRegister(): void {
    this.authService.registerNewUser(this.emailValue, this.passwordValue)
    .pipe(
      filter((res: UserInfo) => !!res)
      )
    .subscribe(() => this.router.navigate(['courses']));
  }
}
