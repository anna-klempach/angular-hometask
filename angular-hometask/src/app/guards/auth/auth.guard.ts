import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) { }
  public canActivate(): Observable<boolean> | boolean {
    if (!this.service.getAuthorizationToken()) {
      this.router.navigate(['log-in']);
      return false;
    }
    return true;
  }
}
