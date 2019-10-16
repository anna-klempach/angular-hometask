import { Action, createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from './manage-authentication.actions';

export interface State {
    login: string;
    token: string;
    isAuthentified: boolean;
}

const { login: currentLogin, token: currentToken } = JSON.parse(window.localStorage.getItem('userInfo'));

export const initialState: State = {
    login: currentLogin || '',
    token: currentToken || '',
    isAuthentified: !!currentToken,
};

const authenticationReducer = createReducer(
    initialState,
    on(AuthenticationActions.setLogin, (state, { login }) => ({
        ...state,
        login
    })),
    on(AuthenticationActions.setToken, (state, { token }) => ({
        ...state,
        token
    })),
    on(AuthenticationActions.setIsAuthentified, (state, { isAuthentified }) => ({
        ...state,
        isAuthentified
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return authenticationReducer(state, action);
}
export const authFeatureKey = 'authInfo';
