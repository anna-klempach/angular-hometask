import { TestBed, getTestBed  } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

describe('AuthServiceService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AuthService,
    {provide: Store, useValue: {}}
    ]});
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    injector = getTestBed();
    service = injector.get(AuthService);
    expect(service).toBeTruthy();
  });
});
