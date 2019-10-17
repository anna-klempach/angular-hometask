import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CoursesService } from '../../../services/courses/courses.service';
import * as CoursesActions from '../manage-courses-list.actions';

@Injectable()
export class CoursesEffects {

  public loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.loadCourses),
    mergeMap(action => this.coursesService.getCourses(action.searchValue)
      .pipe(
        map(courses => (CoursesActions.setCourses({ courses }))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
