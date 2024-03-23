import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FhirTerminologyService {
  private cache = new Map<string, Observable<any[]>>();
  private fhirServerUrl = 'https://ontoserver.imi.uni-luebeck.de/fhir';

  constructor(private http: HttpClient) {}

  getValuesFromValueSet(valueSetUrl: string): Observable<any[]> {
    if (this.cache.has(valueSetUrl)) {
      return this.cache.get(valueSetUrl);
    } else {
      const request$ = this.http
        .get<any>(`${this.fhirServerUrl}/ValueSet/$expand?url=${encodeURIComponent(valueSetUrl)}`)
        .pipe(
          map((response) => this.extractCodesFromResponse(response)),
          shareReplay(1),
          catchError(this.handleError)
        );
      this.cache.set(valueSetUrl, request$);
      return request$;
    }
  }

  private extractCodesFromResponse(response: any): any[] {
    if (!response.expansion || !response.expansion.contains) {
      return [];
    }
    return response.expansion.contains.map((item: any) => ({
      code: item.code,
      display: item.display,
      system: item.system,
    }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A network error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
