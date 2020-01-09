import { createSelector, createFeatureSelector } from '@ngrx/store';
import { featureKey, IAuthorsState } from './manage-authors-list.reducer';

export interface IAppAuthorsState {
    [featureKey]: IAuthorsState;
}

export const selectFeature = createFeatureSelector<IAppAuthorsState, IAuthorsState>(featureKey);

export const selectAuthors = createSelector(
    selectFeature,
    (state: IAuthorsState) => state.authors.map(author => author.name)
);
