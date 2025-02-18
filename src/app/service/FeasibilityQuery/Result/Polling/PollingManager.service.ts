import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  switchMap,
  takeUntil,
  map,
  share,
  interval,
  timer,
  takeWhile,
  endWith,
  tap,
  defaultIfEmpty,
} from 'rxjs';
import { PollingService } from './Polling.service';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { QueryResultMapperService } from '../Mapping/QueryResultMapper.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';

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
   * Initiates polling for the provided feasibility query.
   * It first retrieves the polling URL (and thus the result ID) from the backend,
   * adds the result ID to the query, and then starts polling.
   *
   * @param feasibilityQuery The feasibility query object.
   * @returns An Observable that emits QueryResult updates, ending with a null value.
   */
  public getPollingResult(feasibilityQuery: FeasibilityQuery): Observable<QueryResult> {
    return this.pollingService.getFeasibilityIdFromPollingUrl(feasibilityQuery).pipe(
      switchMap((feasibilityQueryResultId) => {
        feasibilityQuery.addResultId(feasibilityQueryResultId);
        return this.startPollingProcess(feasibilityQueryResultId, feasibilityQuery.getId()).pipe(
          takeWhile((result) => result !== null, true)
        );
      })
    );
  }

  /**
   * Starts the polling process for a given result ID.
   *
   * @param resultId The result ID to poll.
   * @param feasibilityQueryId The ID of the originating feasibility query.
   * @returns An Observable that emits QueryResult updates and ends with null.
   */
  private startPollingProcess(
    resultId: string,
    feasibilityQueryId: string
  ): Observable<QueryResult> {
    this.resetStopSignal();
    return interval(this.pollingService.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.pollingService.POLLING_MAXL_MILLISECONDS + 200)),
      switchMap(() => this.pollingService.requestSummaryResult(resultId)),
      map((pollingResult) => this.processPollingResult(pollingResult, feasibilityQueryId)),
      takeUntil(this.stopPolling$),
      endWith(null),
      share()
    );
  }

  /**
   * Processes a raw polling response into a structured QueryResult.
   *
   * @param pollingResult The raw result returned by the polling API.
   * @param feasibilityQueryId The originating feasibility query's ID.
   * @returns A structured QueryResult.
   */
  private processPollingResult(pollingResult: any, feasibilityQueryId: string): QueryResult {
    return this.queryResultMapperService.createQueryResult(false, pollingResult, feasibilityQueryId);
  }

  /**
   * Stops the polling process by emitting a value on the stop subject.
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
