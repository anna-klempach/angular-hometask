import { createAction, props } from '@ngrx/store';

export const setLogin = createAction('[Login Page] Login',
    props<{ login: string }>());
export const setToken = createAction('[Login Page] Token',
    props<{ token: string }>());
export const setIsAuthentified = createAction('[Login Page] Authentified',
    props<{ isAuthentified: boolean }>());
