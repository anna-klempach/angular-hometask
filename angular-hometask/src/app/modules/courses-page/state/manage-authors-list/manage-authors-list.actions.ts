import { createAction, props } from '@ngrx/store';
import { IAuthor } from 'src/app/interfaces/author.model';

export const setAuthors = createAction('[Add Course Page] Set Authors',
    props<{ authors: IAuthor[] }>());
export const resetAuthors = createAction('[Add Course Page] Reset Authors',
    props<{ authors: IAuthor[] }>());
export const loadAuthors = createAction('[Add Course Page] Load Authors');
export const reloadAuthors = createAction('[Add Course Page] Reload Authors');

