import { Injectable } from '@angular/core';
import { IAuthor } from 'src/app/interfaces/author.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/modules/shared/services/error-handler/http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private authorsUrl = 'http://localhost:3000/authors';
  public loading = new BehaviorSubject(false);
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) { }

  public getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(
      this.authorsUrl
    )
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          console.log(res);
          return res;
        }),
        catchError((err) => {
          console.error(err.message);
          return throwError('Error thrown from catchError');
        })
      );
  }
}
