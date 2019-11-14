import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }
    intercept(req: HttpRequest<JSON>, next: HttpHandler): Observable<HttpEvent<JSON>> {
        const authToken = this.auth.getAuthorizationToken();
        if (authToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', authToken)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
