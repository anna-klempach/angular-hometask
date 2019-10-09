import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.auth.getAuthorizationToken(); // take token from authservice
        console.log(req);
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken) // clone request & add token to the header of the request
        });
        return next.handle(authReq);
    }
}
