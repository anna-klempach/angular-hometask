import { Injectable } from '@angular/core';
import { CoursesListItem } from '../courses-page/courses-list-item.model';
import { CoursesListEntry } from '../courses-page/courses-list-entry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders().set('Authorization', 'token').set('Hello', 'people')
};

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesUrl = 'http://localhost:3000/courses';
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CoursesService');
  }

  public getCourses(): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(this.coursesUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getCourses', []))
      );
  }

  public createCourse(createdCourse: CoursesListItem): Observable<CoursesListItem> {
    const course: CoursesListItem = {...createdCourse};
    return this.http.post<CoursesListItem>(
      this.coursesUrl,
      course,
      httpOptions)
      .pipe(
        catchError(this.handleError('createCourse', course))
      );
  }

  public getItem(id: number): Observable<CoursesListItem[]> {
    const options = id ?
      { params: new HttpParams().set('id', id.toString()) } : {};
    return this.http.get<CoursesListItem[]>(this.coursesUrl, options)
      .pipe(
        catchError(this.handleError<CoursesListItem[]>('getItem', []))
      );
  }

  public updateItem(courseItem: CoursesListItem): Observable<CoursesListItem> {
    const url = `${this.coursesUrl}/${courseItem.id}`;
    return this.http.put<CoursesListItem>(url, courseItem, httpOptions)
      .pipe(
        catchError(this.handleError('updateItem', courseItem))
      );
  }

  public removeItem(id: number): Observable<{}> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('removeItem'))
      );
  }
}
