import { createAction, props } from '@ngrx/store';
import { ICoursesListItem } from 'src/app/interfaces/courses-list-item.model';

export const setCourses = createAction('[Courses Page] Set Courses',
    props<{ courses: ICoursesListItem[] }>());

export const loadCourses = createAction('[Courses Page] Load Courses',
    props <{ searchValue: string }>());
/* export const setToken = createAction('[Login Page] Token',
    props<{ token: string }>());
export const setIsAuthentified = createAction('[Login Page] Authentified',
    props<{ isAuthentified: boolean }>()); */
