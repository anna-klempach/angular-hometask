import { Injectable } from '@angular/core';
import { userInfo } from 'os';

export interface UserInfo {
  login: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login = '';
  token = '';

  constructor() { }
  public logIn(login: string, token: string): void {
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
