import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
  userInfo = new BehaviorSubject('');
  isAuthentified = new BehaviorSubject(false);
  private handleError: HandleError;
  loading = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AuthService');
  }

  public logIn(email: string = '', password: string = ''): Observable<UserInfo> {
    this.loading.next(true);
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
          this.userInfo.next(this.login);
          this.isAuthentified.next(this.authentified);
        }
        return res;
      }),
      catchError(this.handleError('logIn', user)) // show some message to the user, think about it later
    );
  }

  public registerNewUser(email: string = '', password: string = ''): Observable<UserInfo> {
    this.loading.next(true);
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
          this.userInfo.next(this.login);
          this.isAuthentified.next(this.authentified);
        }
        this.loading.next(false);
        return res;
      }),
      catchError(this.handleError('registerNewUser', user)) // show some message to the user, think about it later
    );
  }

  public logOut(): Observable<any> {
    this.loading.next(true);
    return new Observable((observer) => {
      this.authToken = '';
      this.authentified = false;
      this.isAuthentified.next(this.authentified);
      observer.next();
      this.loading.next(false);
      return {unsubscribe() {}};
    });
  }

  public getAuthorizationToken() {
    return this.authToken;
  }
}
