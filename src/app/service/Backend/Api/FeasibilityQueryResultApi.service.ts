import { FeasibilityQueryPaths } from '../Paths/FeasibilityQueryPaths';
import { FeasibilityQueryResultPaths } from '../Paths/FeasibilityQueryResultsPaths';
import { FeatureService } from '../../Feature.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryResultRateLimit } from 'src/app/model/Result/QueryResultRateLimit';
import { BackendService } from '../Backend.service';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryResultApiService {
  private resultObservable = null;

  constructor(
    private backendService: BackendService,
    private http: HttpClient,
    private feature: FeatureService
  ) {}

  public getSummaryResult(feasibilityQueryResultId: string): Observable<any> {
    const url =
      FeasibilityQueryPaths.getBaseUrl() +
      '/' +
      feasibilityQueryResultId +
      FeasibilityQueryResultPaths.SUMMARY_RESULT;
    const result = this.http.get<any>(this.backendService.createUrl(url));
    return this.createReplySubject(result);
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

  public getDetailedResultRateLimit(): Observable<any> {
    return this.http.get<QueryResultRateLimit>(
      this.backendService.createUrl(
        FeasibilityQueryResultPaths.getBaseUrl() +
          FeasibilityQueryResultPaths.DETAILED_OBFUSCATED_RESULT_RATE_LIMIT
      )
    );
  }

  public getDetailedObfuscatedResult(feasibilityQueryResultId: string): Observable<any> {
    const url =
      FeasibilityQueryResultPaths.getBaseUrl() +
      '/' +
      feasibilityQueryResultId +
      FeasibilityQueryResultPaths.DETAILED_OBFUSCATED_RESULT;
    const result = this.http.get<any>(this.backendService.createUrl(url));
    return this.createReplySubject(result);
  }

  private createReplySubject(result: any): Observable<any> {
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
}
