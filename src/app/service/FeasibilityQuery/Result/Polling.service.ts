import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryApiService } from '../../Backend/Api/FeasibilityQueryApi.service';
import { FeasibilityQueryResultApiService } from '../../Backend/Api/FeasibilityQueryResultApi.service';
import { FeatureService } from '../../Feature.service';
import { Injectable } from '@angular/core';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { interval, map, Observable, share, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { UIQuery2StructuredQueryService } from '../../Translator/StructureQuery/UIQuery2StructuredQuery.service';

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  readonly POLLING_INTERVALL_MILLISECONDS = this.featureService.getPollingIntervall() * 1000;
  readonly POLLING_MAXL_MILLISECONDS = this.featureService.getPollingTime() * 1000;

  private stopPolling$ = new Subject<void>();

  constructor(
    private feasibilityQueryResultApiService: FeasibilityQueryResultApiService,
    private featureService: FeatureService,
    private feasibilityQueryApiService: FeasibilityQueryApiService,
    private translator: UIQuery2StructuredQueryService
  ) {}

  /**
   * Starts polling results for a given query ID.
   *
   * @param resultId The ID of the feasibility query result.
   * @returns Observable<QueryResult> that emits results over time.
   */
  public startPolling(resultId: string): Observable<any> {
    this.resetStopSignal();
    return interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 200)),
      switchMap(() => this.requestSummaryResult(resultId)),
      takeUntil(this.stopPolling$),
      share()
    );
  }

  /**
   * Retrieves a summary of the query result.
   *
   * @param resultId The ID of the feasibility query result.
   */
  public requestSummaryResult(resultId: string): Observable<any> {
    return this.feasibilityQueryResultApiService.getSummaryResult(resultId);
  }

  public getFeasibilityIdFromPollingUrl(query: FeasibilityQuery): Observable<string> {
    return this.feasibilityQueryApiService
      .postStructuredQuery(this.translator.translateToStructuredQuery(query))
      .pipe(
        map((result) => {
          const pollingUrl = result.headers.get('location');
          return pollingUrl.substring(pollingUrl.lastIndexOf('/') + 1);
        })
      );
  }

  /**
   * Stops the polling process.
   */
  public stopPolling(): void {
    this.stopPolling$.next();
  }

  /**
   * Ensures a fresh stop signal before polling starts.
   */
  private resetStopSignal(): void {
    if (this.stopPolling$.closed) {
      this.stopPolling$ = new Subject<void>();
    }
  }
}
