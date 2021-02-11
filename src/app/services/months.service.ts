import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Months } from '../interfaces/months';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonthsService {

  constructor(private readonly httpClient: HttpClient) { }


  getItemAMonth(): Observable<Months> {
    return this.httpClient.get<Months>('http://localhost:8080/')
      .pipe(
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        }),
      );
  }
}

