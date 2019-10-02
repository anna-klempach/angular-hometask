import { Injectable } from '@angular/core';

export interface UserInfo {
  login: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login = 'hello';
  token = '12345';

  constructor() { }
  public logIn(login: string = this.login, token: string = this.token): void {
    window.localStorage.setItem('userInfo', JSON.stringify({ login, token }));
    this.login = login;
    this.token = token;
  }

  public logOut(): void {
    window.localStorage.setItem('userInfo', JSON.stringify({ login: '', token: '' }));
    this.login = '';
    this.token = '';
  }

  private isAuthenticated(): boolean {
    const currentUserLogin: string | undefined = this.getUserInfo();
    if (currentUserLogin) {
      return true;
    }
    return false;
  }

  private getUserInfo(): string {
    const currentUserInfo: UserInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    return currentUserInfo.login;
  }
}
