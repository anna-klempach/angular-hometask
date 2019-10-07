import { Injectable } from '@angular/core';
import { COURSES } from '../courses-page/courses';
import { CoursesListItem } from '../courses-page/courses-list-item.model';
import { CoursesListEntry } from '../courses-page/courses-list-entry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { filter } from 'rxjs/operators';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  // public courses: CoursesListItem[] = COURSES;
  coursesUrl = 'api/courses';
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('CoursesService');
     }

  public getCourses(): Observable<CoursesListItem[]> {
    return this.http.get<CoursesListItem[]>(this.coursesUrl)
      .pipe(
        catchError(this.handleError('getCourses', []))
      );
  }

  public createCourse(
    id: number, title: string, creationDate: Date, duration: number = 0, description: string = '', topRated: boolean = false
  ): Observable<CoursesListItem> {
    const course = new CoursesListEntry(id, title, creationDate, duration, description, topRated);
    return this.http.post<CoursesListItem>(
      this.coursesUrl,
      course,
      httpOptions)
      .pipe(
        catchError(this.handleError('createCourse', course))
      );
  }

  public getItem(id: number): Observable<CoursesListItem[]> {
    const url = `${this.coursesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.get<CoursesListItem[]>(this.coursesUrl)
      .pipe(
        filter<CoursesListItem[]>(item => item.id === id), // WTF??
        catchError(this.handleError('getCourses', []))
      );
    /* const filteredCourses = this.courses.filter((item) => item.id === id);
    return filteredCourses.length > 0
      ? filteredCourses[0]
      : null; */
  }

  public updateItem(courseItem: CoursesListItem): Observable<CoursesListItem> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<CoursesListItem>(this.coursesUrl, courseItem, httpOptions)
      .pipe(
        catchError(this.handleError('updateItem', courseItem))
      );
    /* const changedCourses: CoursesListItem[] = this.courses.map<CoursesListItem>((item: CoursesListItem): CoursesListItem => {
      if (item.id === courseItem.id) {
        return courseItem;
      }
      return item;
    });
    this.courses = changedCourses;
    console.log(this.courses); */
  }

  public removeItem(id: number): Observable<{}> {
    const url = `${this.coursesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('removeItem'))
      );
    // this.courses = this.courses.filter((item) => item.id !== id);
  }
}
