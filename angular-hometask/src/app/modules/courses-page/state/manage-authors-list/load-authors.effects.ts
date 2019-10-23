import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthorsService } from '../../services/authors/authors.service';
import * as AuthorsActions from './manage-authors-list.actions';

@Injectable()
export class AuthorsEffects {

  public loadAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorsActions.loadAuthors),
    mergeMap(() => this.authorsService.getAuthors()
      .pipe(
        map(authors => (AuthorsActions.setAuthors({ authors }))),
        catchError(() => EMPTY)
      ))
    )
  );

  /* public reloadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.reloadCourses),
    mergeMap(action => this.coursesService.resetCourses(action.searchValue)
      .pipe(
        map(courses => (CoursesActions.resetCourses({ courses }))),
        catchError(() => EMPTY)
      ))
    )
  ); */

  /* public deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.deleteCourse),
    mergeMap(action => this.coursesService.removeItem(action.id)
      .pipe(
        map(() => (CoursesActions.reloadCourses({searchValue: action.searchValue}))),
        catchError(() => EMPTY)
      ))
    )
  );

  public addCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.addCourse),
    mergeMap(action => this.coursesService.createCourse(action.course)
      .pipe(
        map(() => (CoursesActions.reloadCourses({searchValue: ''}))),
        catchError(() => EMPTY)
      ))
    )
  );

  public editCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.editCourse),
    mergeMap(action => this.coursesService.updateItem(action.course)
      .pipe(
        map(() => (CoursesActions.reloadCourses({searchValue: ''}))),
        catchError(() => EMPTY)
      ))
    )
  );
 */
  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService
  ) {}
}
