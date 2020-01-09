import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';

export class CoursesListEntry implements ICoursesListItem {

    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated: boolean;
    authors: string[];

    constructor(
        id: number, title: string,
        creationDate: Date,
        duration: number = 0,
        description: string = '',
        topRated: boolean = false,
        authors: string[] = []) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.duration = duration;
        this.description = description;
        this.topRated = topRated;
        this.authors = authors;
    }
}
