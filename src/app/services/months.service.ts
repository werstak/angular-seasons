import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Months } from '../interfaces/months';
import { catchError, map, pluck } from 'rxjs/operators';
import { ServerResponse } from '../interfaces/response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthsService {
  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getMonths(): Observable<Months[]> {
    return this.httpClient.get<ServerResponse<Months[]>>(environment.serverUrl)
      .pipe(
        pluck('data'),
        map(months => {
          return months.map(month => ({
            ...month,
            image: `${environment.serverUrl}/${month.image}`,
          }));
        }),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        }),
      );
  }
}

