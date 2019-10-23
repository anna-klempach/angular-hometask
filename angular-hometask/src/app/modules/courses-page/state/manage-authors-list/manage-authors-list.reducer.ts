import { Action, createReducer, on } from '@ngrx/store';
import * as AuthorsActions from './manage-authors-list.actions';
import { IAuthor } from 'src/app/interfaces/author.model';

export interface IAuthorsState {
    authors: IAuthor[];
}

export const initialState: IAuthorsState = {
    authors: []
};

const authorsReducer = createReducer(
    initialState,
    on(AuthorsActions.setAuthors, (state, { authors }) => ({
        ...state,
        authors: state.authors.concat(authors)
    })),
    on(AuthorsActions.resetAuthors, (state, { authors }) => ({
        ...state,
        authors
    }))
);

export function reducer(state: IAuthorsState | undefined, action: Action) {
    return authorsReducer(state, action);
}
export const featureKey = 'authors';



