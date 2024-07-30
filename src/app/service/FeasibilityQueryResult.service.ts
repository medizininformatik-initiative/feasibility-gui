import { Injectable } from '@angular/core';
import { interval, map, Observable, share, switchMap, takeUntil, timer } from 'rxjs';
import { QueryResult } from '../model/Result/QueryResult';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { FeatureService } from './Feature.service';
import { UIQuery2StructuredQueryTranslatorService } from './UIQuery2StructuredQueryTranslator.service';
import { FeasibilityQuery } from '../model/FeasibilityQuery/FeasibilityQuery';
import { ResultProviderService } from './Provider/ResultProvider.service';
import { QueryResultLine } from '../model/Result/QueryResultLine';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryResultService {
  readonly POLLING_INTERVALL_MILLISECONDS = this.featureService.getPollingIntervall() * 1000;
  readonly POLLING_MAXL_MILLISECONDS = this.featureService.getPollingTime() * 1000;
  resultObservable$: Observable<QueryResult>;
  constructor(
    private backend: BackendService,
    private featureService: FeatureService,
    private translator: UIQuery2StructuredQueryTranslatorService,
    private resultProvider: ResultProviderService
  ) {}

  public getPollingUrl(query: FeasibilityQuery): Observable<string> {
    console.log(query);
    return this.backend.postQueryNew(this.translator.translateToStructuredQuery(query)).pipe(
      map((result) => {
        console.log(result);
        return result.headers.get('location'); // response.location)
      })
    );
  }
  public getResultPolling(
    resultUrl: string,
    queryID: string,
    withDetails: boolean
  ): Observable<QueryResult> {
    return interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 100)),
      switchMap(() => this.getResult(resultUrl, queryID, withDetails)),
      share()
    );
  }

  public getResult(
    resultUrl: string,
    queryID: string,
    withDetails: boolean
  ): Observable<QueryResult> {
    let url: string;
    // eslint-disable-next-line
    withDetails
      ? (url = resultUrl + '/detailed-obfuscated-result')
      : (url = resultUrl + '/summary-result');
    return (
      this.backend
        //.getSummaryResult(url)
        .getDetailedResult(url, false)
        .pipe(
          map((result) => {
            const queryResult: QueryResult = new QueryResult(
              queryID,
              result.totalNumberOfPatients,
              result.queryId,
              result.resultLines.map(
                (line) => new QueryResultLine(line.numberOfPatients, line.siteName)
              ),
              result.issues
            );
            this.resultProvider.setResultByID(queryResult);
            return queryResult;
          })
        )
    );
  }
}