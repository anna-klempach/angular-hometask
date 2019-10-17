import { createSelector, createFeatureSelector } from '@ngrx/store';
import { featureKey, ICoursesState } from './manage-courses-list.reducer';

export interface IAppState {
    [featureKey]: ICoursesState;
}

export const selectFeature = createFeatureSelector<IAppState, ICoursesState>(featureKey);

export const selectCourses = createSelector(
    selectFeature,
    (state: ICoursesState) => state.courses
);

/* export const selectToken = createSelector(
    selectFeature,
    (state: AuthState) => state.token
);

export const selectIsAuthenticated = createSelector(
    selectFeature,
    (state: AuthState) => state.isAuthentified
); */
