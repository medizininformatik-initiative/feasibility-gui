import { Injectable } from '@angular/core';
import { NewBackendService } from '../NewBackend.service';
import { HttpClient } from '@angular/common/http';
import { FeatureService } from '../../Feature.service';
import { Observable, of } from 'rxjs';
import { QueryResultRateLimit } from 'src/app/model/Result/QueryResultRateLimit';
import { QueryResultPaths } from '../Paths/QueryResultsPaths';

@Injectable({
  providedIn: 'root',
})
export class QueryResultApiService {
  private resultObservable = null;

  constructor(
    private backendService: NewBackendService,
    private http: HttpClient,
    private feature: FeatureService
  ) {}

  public getSummaryResult(resultUrl: string): Observable<any> {
    if (this.feature.mockResult()) {
      const result = {
        totalNumberOfPatients: Math.floor(Math.random() * 10000000),
        queryId: '12345',
        resultLines: [],
      };

      return of(result);
    }

    return this.http.get<any>(resultUrl);
  }

  public getDetailedResult(resultUrl: string, gottenDetailedResult: boolean): Observable<any> {
    /*if (this.feature.mockResult()) {
              const mockResult = {
                totalNumberOfPatients: Math.floor(Math.random() * 10000000),
                queryId: '12345',
                resultLines: [
                  { siteName: 'Standort 1', numberOfPatients: 351 },
                  { siteName: 'Standort 2', numberOfPatients: 1277 },
                  { siteName: 'Standort 3', numberOfPatients: 63000000 },
                  { siteName: 'Standort 4', numberOfPatients: 0 },
                ],
              };
              return of(mockResult);
            }*/
    if (gottenDetailedResult) {
      return this.resultObservable;
    }

    const result = this.http.get<any>(resultUrl);

    return Observable.create((obs: any) => {
      result.subscribe(
        (queryResult) => {
          this.resultObservable = Observable.create((queryResultObs: any) => {
            queryResultObs.next(queryResult);
            queryResultObs.complete();
          });
          obs.next(queryResult);
          obs.complete();
        },
        (error) => {
          this.resultObservable = Observable.create((innerObs: any) => {
            innerObs.error(error);
            innerObs.complete();
          });
          obs.error(error);
          obs.complete();
        }
      );
    });
  }

  public getDetailedResultRateLimit(): Observable<QueryResultRateLimit> {
    return this.http.get<QueryResultRateLimit>(
      this.backendService.createUrl(QueryResultPaths.DETAILED_OBFUSCATED_RESULT_RATE_LIMIT)
    );
  }
}
