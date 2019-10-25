import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../error-handler/http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setIsAuthentified, setLogin, setToken } from '../../state/manage-authentication/manage-authentication.actions';
import { AuthState } from '../../state/manage-authentication/manage-authentication.selectors';


export interface UserInfo {
  email?: string;
  password?: string;
  accessToken?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000';
  private handleError: HandleError;
  public loading = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private store: Store<AuthState>) {
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
          this.store.dispatch(setToken({token: res.accessToken}));
          this.store.dispatch(setIsAuthentified({ isAuthentified: true }));
          const login = /.+(?=@)/.exec(email)[0];
          this.store.dispatch(setLogin({ login }));
          window.localStorage.setItem('userInfo', JSON.stringify({ login, token: res.accessToken }));
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
          this.store.dispatch(setToken({token: res.accessToken}));
          this.store.dispatch(setIsAuthentified({ isAuthentified: true }));
          const login = /.+(?=@)/.exec(email)[0];
          this.store.dispatch(setLogin({ login }));
          window.localStorage.setItem('userInfo', JSON.stringify({ login, token: res.accessToken }));
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
      this.store.dispatch(setToken({token: ''}));
      this.store.dispatch(setIsAuthentified({ isAuthentified: false }));
      observer.next();
      this.loading.next(false);
      window.localStorage.setItem('userInfo', JSON.stringify({ login: '', token: '' }));
      return { unsubscribe() { } };
    });
  }

  public getAuthorizationToken(): string {
    return JSON.parse(window.localStorage.getItem('userInfo'))
    ? JSON.parse(window.localStorage.getItem('userInfo')).token
    : '';
  }
}
