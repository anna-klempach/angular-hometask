import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoursesService } from 'src/app/modules/courses-page/services/courses/courses.service';
import { AuthService } from '../auth/auth.service';


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
