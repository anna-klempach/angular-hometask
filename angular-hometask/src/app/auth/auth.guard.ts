import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) { }
  public canActivate(): Observable<boolean> {
    if (!this.service.getAuthorizationToken()) {
      this.router.navigate(['log-in']);
      return of(false);
    }
    return of(true);
  }
}
