import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable, empty, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface UserInfo {
  email?: string;
  password?: string;
  accessToken?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:3000';
  authToken = '';
  authentified = false;
  ipAddress: string;
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AuthService');
  }
  public logIn(login: string = '', token: string = ''): Observable<string> {
    return this.http.get<string>(this.authUrl);
  }

  public registerNewUser(email: string = '', password: string = ''): void {
    const user = { email, password };
    this.http.post<UserInfo>(
      `${this.authUrl}/register`,
      user
    ).pipe(
      catchError(this.handleError('registerNewUser', user))
    ).subscribe((res: UserInfo) => {
      this.authToken = res.accessToken;
      if (this.authToken) {
        this.authentified = true;
      }
      return of(user);
    });
  }

  public logOut(): void {
    window.localStorage.setItem('userInfo', JSON.stringify({ login: '', token: '' }));
  }

  public isAuthenticated(): boolean {
    /* this.http.get<IPData>('https://jsonip.com')
    .subscribe( data => {
      console.log('ip', data);
      this.ipAddress = data.ip;
    }); */
    return this.authentified;
  }

  public getUserInfo(): Observable<string> {
    return this.http.get<string>(this.authUrl);
  }

  public getAuthorizationToken() {
    return 'some-auth-token';
  }
}
