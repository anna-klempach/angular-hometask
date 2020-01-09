import { AuthInterceptor } from './auth-interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService, UserInfo } from '../modules/shared/services/auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CoursesService } from '../modules/courses-page/services/courses/courses.service';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

describe('AuthInterceptor with token', () => {
  let authServiceStub: Partial<AuthService>;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    authServiceStub = {
      getAuthorizationToken() { return '123'; },
      logIn(email: string = '', password: string = ''): Observable<UserInfo> {
        return httpClient.post<UserInfo>('/login', { email, password });
      }
    };
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: Store, useValue: {} },
        HttpClient
      ],
    });
    service = testBed.get(AuthService);
    httpMock = testBed.get(HttpTestingController);
    httpClient = testBed.get(HttpClient);
  });
  it('should add a header to a request', () => {
    authServiceStub.logIn('123@gmail.com', '123').subscribe(() => {});
    const httpRequest = httpMock.expectOne('/login');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });
});

describe('AuthInterceptor without token', () => {
  let authServiceStub: Partial<AuthService>;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    authServiceStub = {
      getAuthorizationToken() { return null; },
      logIn(email: string = '', password: string = ''): Observable<UserInfo> {
        return httpClient.post<UserInfo>('/login', { email, password });
      }
    };
    const testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        { provide: Store, useValue: {} },
        HttpClient
      ],
    });
    service = testBed.get(AuthService);
    httpMock = testBed.get(HttpTestingController);
    httpClient = testBed.get(HttpClient);
  });
  it('should add a header to a request', () => {
    authServiceStub.logIn('123@gmail.com', '123').subscribe(() => {});
    const httpRequest = httpMock.expectOne('/login');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });
});
