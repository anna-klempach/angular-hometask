import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';


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
  login = '';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AuthService');
  }

  public logIn(email: string = '', password: string = ''): Observable<UserInfo> {
    const user = { email, password };
    return this.http.post<UserInfo>(
      `${this.authUrl}/login`,
      user
    ).pipe(
      retry(3),
      map((res: UserInfo) => {
        if (res.accessToken) {
          this.authToken = res.accessToken;
          this.authentified = true;
          this.login = /.+(?=@)/.exec(email)[0];
        }
        return res;
      }),
      catchError(this.handleError('logIn', user)) // show some message to the user, think about it later
    );
  }

  public registerNewUser(email: string = '', password: string = ''): Observable<UserInfo> {
    const user = { email, password };
    return this.http.post<UserInfo>(
      `${this.authUrl}/register`,
      user
    ).pipe(
      retry(3),
      map((res: UserInfo) => {
        if (res.accessToken) {
          this.authToken = res.accessToken;
          this.authentified = true;
          this.login = /.+(?=@)/.exec(email)[0];
        }
        return res;
      }),
      catchError(this.handleError('registerNewUser', user)) // show some message to the user, think about it later
    );
  }

  public logOut(): Observable<any> {
    return new Observable((observer) => {
      this.authToken = '';
      this.authentified = false;
      observer.next();
      return {unsubscribe() {}};
    });
  }

  public isAuthenticated(): boolean {
    return this.authentified;
  }

  public getUserInfo(): string {
    return this.login;
  }

  public getAuthorizationToken() {
    return this.authToken;
  }
}
