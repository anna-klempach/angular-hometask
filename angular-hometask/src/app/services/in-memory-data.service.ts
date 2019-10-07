import { InMemoryDbService } from 'angular-in-memory-web-api';
import { COURSES } from '../courses-page/courses';

export class InMemoryDataService implements InMemoryDbService {
  createDb(reqInfo?: import('angular-in-memory-web-api').RequestInfo): {} | import('rxjs').Observable<{}> | Promise<{}> {
    const courses = COURSES.slice(0);
    return { courses };
  }
}
