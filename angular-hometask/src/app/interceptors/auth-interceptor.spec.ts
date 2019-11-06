import { AuthInterceptor } from './auth-interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService, UserInfo } from '../modules/shared/services/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoursesService } from '../modules/courses-page/services/courses/courses.service';

describe('AuthInterceptor', () => {
  let authServiceStub: Partial<AuthService>;
  let service: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    authServiceStub = {
      /* logIn(email: string = '', password: string = '') {
        const user = { email, password };
        return this.http.post<UserInfo>(
          'http://localhost:3000/login',
          user;
        ),
      }, */
      getAuthorizationToken() { return '123'; },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should add a header to a request', () => {
    console.log('*********************88888888888888888888888888888********************', service);
    service.logIn('123@gmail.com', '123').subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`http://localhost:3000/login`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });
});
