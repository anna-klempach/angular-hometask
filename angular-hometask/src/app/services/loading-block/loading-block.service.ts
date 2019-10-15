import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CoursesService } from '../courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingBlockService {
  displayed = new BehaviorSubject(false);
  constructor(
    private authService: AuthService,
    private coursesService: CoursesService) {
    this.authService.loading
      .subscribe((value) => this.toggleLoading(value));
    this.coursesService.loading
      .subscribe((value) => this.toggleLoading(value));
  }

  toggleLoading(value: boolean) {
    this.displayed.next(value);
  }
}
