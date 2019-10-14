import { Injectable } from '@angular/core';
import { CoursesListItem } from '../courses-page/courses-list-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';


import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const LIMIT = 5;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesUrl = 'http://localhost:3000/courses';
  loadedPages = 1;
  loading = new BehaviorSubject(false);
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CoursesService');
  }

  public increasePagesNumber() {
    this.loadedPages += 1;
  }

  public discardPagesNumber() {
    this.loadedPages = 1;
  }

  public getCourses(searchValue: string): Observable<CoursesListItem[]> {
    this.loading.next(true);
    return this.http.get<CoursesListItem[]>(
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

  public createCourse(createdCourse: CoursesListItem): Observable<CoursesListItem> {
    this.loading.next(true);
    const course: CoursesListItem = {...createdCourse};
    return this.http.post<CoursesListItem>(
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

  public getItem(id: number): Observable<CoursesListItem[]> {
    this.loading.next(true);
    const options = id ?
      { params: new HttpParams().set('id', id.toString()) } : {};
    return this.http.get<CoursesListItem[]>(this.coursesUrl, options)
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          return res;
        }),
        catchError(this.handleError<CoursesListItem[]>('getItem', []))
      );
  }

  public updateItem(courseItem: CoursesListItem): Observable<CoursesListItem> {
    this.loading.next(true);
    const url = `${this.coursesUrl}/${courseItem.id}`;
    return this.http.put<CoursesListItem>(url, courseItem)
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
