import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IBook } from './models/book.model';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  list_books: IBook[] = [];

  constructor(private httpClient: HttpClient) { }
  private booksURL = 'api/books/books.json';

  public getBooks(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(this.booksURL).pipe(
      tap(data => console.log('All books:' + JSON.stringify(data))),
      catchError(this.handleErrors)
    );
  }

  private handleErrors(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
