import { Injectable } from '@angular/core';
import { IAuthor } from 'src/app/interfaces/author.model';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private authorsUrl = 'http://localhost:3000/authors';
  public loading = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

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

  public createAuthor(author: IAuthor): Observable<IAuthor> {
    this.loading.next(true);
    console.log(author);
    return this.http.post<IAuthor>(
      this.authorsUrl,
      author
    )
      .pipe(
        map(res => {
          if (res) {
            this.loading.next(false);
          }
          return res;
        }),
        catchError((err) => {
          console.error('Add course', err.message);
          return throwError('Error thrown from catchError');
        })
      );
  }
}
