import { createAction, props } from '@ngrx/store';
import { ICoursesListItem } from 'src/app/interfaces/courses-list-item.model';

export const setCourses = createAction('[Courses Page] Set Courses',
    props<{ courses: ICoursesListItem[] }>());
export const resetCourses = createAction('[Courses Page] Reset Courses',
    props<{ courses: ICoursesListItem[] }>());
export const loadCourses = createAction('[Courses Page] Load Courses',
    props<{ searchValue: string }>());
export const reloadCourses = createAction('[Courses Page] Reload Courses',
    props<{ searchValue: string }>());
export const deleteCourse = createAction('[Courses Page] Delete Course',
    props<{ id: number, searchValue: string }>());

