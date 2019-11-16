import { TestBed, getTestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

describe('AuthGuard without access token', () => {
  let injector: TestBed;
  let authService: AuthService;
  let guard: AuthGuard;
  const routerMock = { navigate: jasmine.createSpy('navigate') };
  let mockService: Partial<AuthService>;
  beforeEach(() => {
    mockService = {
    getAuthorizationToken() { return null; }
  };
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockService },
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: {} }
      ],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    guard = injector.get(AuthGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });
  it('should navigate to log-in page if no access token is provided', () => {
    expect(guard.canActivate()).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['log-in']);
  });
});

describe('AuthGuard with access token', () => {
  let injector: TestBed;
  let authService: AuthService;
  let guard: AuthGuard;
  const routerMock = { navigate: jasmine.createSpy('navigate') };
  let mockService: Partial<AuthService>;
  beforeEach(() => {
    mockService = {
    getAuthorizationToken() { return '123'; }
  };
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockService },
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: {} }
      ],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    guard = injector.get(AuthGuard);
  });
  it('should not navigate to log-in page if access token is provided', () => {
    expect(guard.canActivate()).toEqual(true);
  });
});
