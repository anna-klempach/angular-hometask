import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './manage-courses-list.actions';
import { ICoursesListItem } from 'src/app/interfaces/courses-list-item.model';

export interface ICoursesState {
    courses: ICoursesListItem[];
}

export const initialState: ICoursesState = {
    courses: []
};

const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.setCourses, (state, { courses }) => ({
        ...state,
        courses: state.courses.concat(courses)
    })),
    on(CoursesActions.resetCourses, (state, { courses }) => ({
        ...state,
        courses
    }))
);

export function reducer(state: ICoursesState | undefined, action: Action) {
    return coursesReducer(state, action);
}
export const featureKey = 'courses';



