import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  switchMap,
  takeUntil,
  share,
  interval,
  timer,
  endWith,
  tap,
  defaultIfEmpty,
  filter,
  finalize,
} from 'rxjs';
import { PollingService } from './Polling.service';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { QueryResultMapperService } from '../Mapping/QueryResultMapper.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { ErrorQueryResult } from 'src/app/model/Result/ErrorQueryResult';

@Injectable({
  providedIn: 'root',
})
export class PollingManagerService {
  private stopPolling$ = new Subject<void>();

  constructor(
    private pollingService: PollingService,
    private queryResultMapperService: QueryResultMapperService
  ) {}

  /**
   * Initiates polling for the feasibility query.
   */
  public getPollingResult(
    feasibilityQuery: FeasibilityQuery
  ): Observable<QueryResult | ErrorQueryResult> {
    return this.pollingService
      .getFeasibilityIdFromPollingUrl(feasibilityQuery)
      .pipe(
        switchMap((feasibilityQueryResultId) =>
          this.startPolling(feasibilityQuery, feasibilityQueryResultId)
        )
      );
  }

  /**
   * Starts polling for the given feasibility query result ID.
   */
  private startPolling(
    feasibilityQuery: FeasibilityQuery,
    resultId: string
  ): Observable<QueryResult | ErrorQueryResult> {
    feasibilityQuery.addResultId(resultId);
    this.resetStopSignal();
    return this.pollingProcess(resultId, feasibilityQuery.getId());
  }

  /**
   * Handles the polling process and error handling.
   */
  private pollingProcess(
    resultId: string,
    feasibilityQueryId: string
  ): Observable<QueryResult | ErrorQueryResult> {
    let lastValidResult: QueryResult | null = null;
    let lastError: any = null;

    return interval(this.pollingService.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.pollingService.POLLING_MAXL_MILLISECONDS + 200)),
      switchMap(() =>
        this.requestPollingResult(resultId).pipe(
          tap((result) => {
            if (result.issues?.length === 0) {
              lastValidResult = this.queryResultMapperService.createQueryResult(
                false,
                result,
                feasibilityQueryId
              );
              lastError = null;
            } else {
              console.log('Error during polling:', result.issues);
              lastError = result.issues; // Store the error
            }
          }),
          filter((result) => result.issues?.length === 0)
        )
      ),
      takeUntil(this.stopPolling$),
      finalize(() => {
        if (!lastValidResult && lastError) {
          lastValidResult = this.queryResultMapperService.createErrorQueryResult(
            lastError,
            feasibilityQueryId
          );
        }
      }),
      defaultIfEmpty(lastValidResult as QueryResult | ErrorQueryResult),
      endWith(null),
      share()
    );
  }

  /**
   * Requests polling results and handles errors.
   */
  private requestPollingResult(resultId: string): Observable<any> {
    return this.pollingService.requestSummaryResult(resultId);
  }

  /**
   * Stops polling by emitting a signal.
   */
  public stopPolling(): void {
    this.stopPolling$.next();
  }

  /**
   * Resets the stop signal if the current subject is closed.
   */
  private resetStopSignal(): void {
    if (this.stopPolling$.closed) {
      this.stopPolling$ = new Subject<void>();
    }
  }
}
