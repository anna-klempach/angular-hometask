import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';

export class CoursesListEntry implements ICoursesListItem {
    authors: string[];
    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;

    constructor(id: number, title: string, creationDate: Date, duration: number = 0, description: string = '', topRated: boolean = false) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.duration = duration;
        this.description = description;
        this.topRated = topRated;
    }
}
