export interface ICoursesListItem {
    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;
    authors: string[];
}

export interface ITranslateValue {
    value: string;
}

export interface ITranslateParams {
    RU: string;
    EN: string;
}

