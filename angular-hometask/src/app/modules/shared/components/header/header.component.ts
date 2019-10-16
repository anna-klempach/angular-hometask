import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectLogin, AppState, selectIsAuthenticated } from '../../state/manage-authentication/manage-authentication.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public login$: Observable<string>;
  public isAuthentified$: Observable<boolean>;
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }
  ngOnInit(): void {
    this.login$ = this.store.pipe(select(selectLogin));
    this.isAuthentified$ = this.store.pipe(select(selectIsAuthenticated));
  }

  handleLogOut(): void {
    this.authService.logOut()
      .subscribe({
        next: () => {
          this.router.navigate(['log-in']);
        }
      });
  }
}
