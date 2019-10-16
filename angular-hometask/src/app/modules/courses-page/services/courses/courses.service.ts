import { Injectable } from '@angular/core';
import { ICoursesListItem } from '../../../../interfaces/courses-list-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../../shared/services/error-handler/http-error-handler.service';

const LIMIT = 5;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesUrl = 'http://localhost:3000/courses';
  private loadedPages = 1;
  public loading = new BehaviorSubject(false);
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CoursesService');
  }

  public increasePagesNumber(): void {
    this.loadedPages += 1;
  }

  public discardPagesNumber(): void {
    this.loadedPages = 1;
  }

  public getCourses(searchValue: string): Observable<ICoursesListItem[]> {
    this.loading.next(true);
    return this.http.get<ICoursesListItem[]>(
      `${this.coursesUrl}?q=${searchValue}&_sort=creationDate&_order=desc&_page=${this.loadedPages}&_limit=${LIMIT}`
      )
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          return res;
        }),
        catchError(this.handleError('getCourses', []))
      );
  }

  public createCourse(createdCourse: ICoursesListItem): Observable<ICoursesListItem> {
    this.loading.next(true);
    const course: ICoursesListItem = {...createdCourse};
    return this.http.post<ICoursesListItem>(
      this.coursesUrl,
      course
      )
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          return res;
        }),
        catchError(this.handleError('createCourse', course))
      );
  }

  public getItem(id: number): Observable<ICoursesListItem[]> {
    this.loading.next(true);
    const options = id ?
      { params: new HttpParams().set('id', id.toString()) } : {};
    return this.http.get<ICoursesListItem[]>(this.coursesUrl, options)
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          return res;
        }),
        catchError(this.handleError<ICoursesListItem[]>('getItem', []))
      );
  }

  public updateItem(courseItem: ICoursesListItem): Observable<ICoursesListItem> {
    this.loading.next(true);
    const url = `${this.coursesUrl}/${courseItem.id}`;
    return this.http.put<ICoursesListItem>(url, courseItem)
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          return res;
        }),
        catchError(this.handleError('updateItem', courseItem))
      );
  }

  public removeItem(id: number): Observable<{}> {
    this.loading.next(true);
    const url = `${this.coursesUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          return res;
        }),
        catchError(this.handleError('removeItem'))
      );
  }
}
