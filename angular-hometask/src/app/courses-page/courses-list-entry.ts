import { CoursesListItem } from './courses-list-item.model';

export class CoursesListEntry implements CoursesListItem {
    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;

    constructor(id: number, title: string, creationDate: Date, duration: number = 0, description: string = '') {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.duration = duration;
        this.description = description;
    }
}
