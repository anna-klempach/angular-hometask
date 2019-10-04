import { Injectable } from '@angular/core';

export interface UserInfo {
  login: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public logIn(login: string = '', token: string = ''): string {
    window.localStorage.setItem('userInfo', JSON.stringify({ login, token }));
    return login;
  }

  public logOut(): void {
    window.localStorage.setItem('userInfo', JSON.stringify({ login: '', token: '' }));
  }

  public isAuthenticated(): boolean {
    const currentUserLogin: string | undefined = this.getUserInfo();
    if (currentUserLogin) {
      return true;
    }
    return false;
  }

  public getUserInfo(): string {
    const currentUserInfo: UserInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    return currentUserInfo.login;
  }
}
