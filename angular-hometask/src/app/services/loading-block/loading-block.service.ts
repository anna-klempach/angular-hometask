import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../modules/shared/services/auth/auth.service';
import { CoursesService } from '../../modules/courses-page/services/courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingBlockService {
  public displayed = new BehaviorSubject(false);
  constructor(
    private authService: AuthService,
    private coursesService: CoursesService) {
    this.authService.loading
      .subscribe((value) => this.toggleLoading(value));
    this.coursesService.loading
      .subscribe((value) => this.toggleLoading(value));
  }

  toggleLoading(value: boolean): void {
    this.displayed.next(value);
  }
}
