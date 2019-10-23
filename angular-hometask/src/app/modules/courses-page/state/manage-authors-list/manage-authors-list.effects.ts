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

  public addAuthor$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorsActions.addAuthor),
    mergeMap(action => this.authorsService.createAuthor(action.author)
      .pipe(
        map(() => (AuthorsActions.loadAuthors())),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService
  ) { }
}
