import { createSelector, createFeatureSelector } from '@ngrx/store';

export const featureKey = 'authInfo';

export interface AuthState {
    login: string;
    token: string;
    isAuthentified: boolean;
}

export interface AppState {
    authInfo: AuthState;
}

export const selectFeature = createFeatureSelector<AppState, AuthState>(featureKey);

export const selectLogin = createSelector(
    selectFeature,
    (state: AuthState) => state.login
);

export const selectToken = createSelector(
    selectFeature,
    (state: AuthState) => state.token
  );

export const selectIsAuthenticated = createSelector(
    selectFeature,
    (state: AuthState) => state.isAuthentified
);
