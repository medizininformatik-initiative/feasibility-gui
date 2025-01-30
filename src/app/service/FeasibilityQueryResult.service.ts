import { FeasibilityQuery } from '../model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryApiService } from './Backend/Api/FeasibilityQueryApi.service';
import { FeasibilityQueryProviderService } from './Provider/FeasibilityQueryProvider.service';
import { FeasibilityQueryResultApiService } from './Backend/Api/FeasibilityQueryResultApi.service';
import { FeatureService } from './Feature.service';
import { Injectable } from '@angular/core';
import { QueryResult } from '../model/Result/QueryResult';
import { QueryResultLine } from '../model/Result/QueryResultLine';
import { ResultProviderService } from './Provider/ResultProvider.service';
import { SnackbarService } from '../shared/service/Snackbar/Snackbar.service';
import { UIQuery2StructuredQueryService } from './Translator/StructureQuery/UIQuery2StructuredQuery.service';
import {
  BehaviorSubject,
  endWith,
  interval,
  map,
  Observable,
  share,
  switchMap,
  takeUntil,
  takeWhile,
  timer,
  filter,
  Subject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryResultService {
  readonly POLLING_INTERVALL_MILLISECONDS = this.featureService.getPollingIntervall() * 1000;
  readonly POLLING_MAXL_MILLISECONDS = this.featureService.getPollingTime() * 1000;
  resultObservable$: Observable<QueryResult>;
  private feasibilityQueryID: string;
  private stopPolling$ = new Subject<void>(); // Stop signal

  private callsLimit: number;
  private callsRemaining: number;
  private queryId: string;
  private result: QueryResult;

  private callsLimitSubject = new BehaviorSubject<number>(0);
  private callsRemainingSubject = new BehaviorSubject<number>(0);

  public callsLimit$: Observable<number> = this.callsLimitSubject.asObservable();
  public callsRemaining$: Observable<number> = this.callsRemainingSubject.asObservable();

  public getCallsLimit(): number {
    return this.callsLimit;
  }

  public getCallsRemaining(): number {
    return this.callsRemaining;
  }

  public getQueryId(): string {
    return this.queryId;
  }

  constructor(
    private feasibilityQueryApiService: FeasibilityQueryApiService,
    private feasibilityQueryResultApiService: FeasibilityQueryResultApiService,
    private featureService: FeatureService,
    private translator: UIQuery2StructuredQueryService,
    private resultProvider: ResultProviderService,
    private snackbar: SnackbarService,
    private queryProviderService: FeasibilityQueryProviderService
  ) {}

  /**
   * The feasibility query being sent is retrieved from the Active Feasibility Query Service.
   * This ensures that the results are always based on the current active feasibility query
   */
  public doSendQueryRequest(): Observable<QueryResult> {
    let feasibilityQuery: FeasibilityQuery;
    this.featureService.sendClickEvent(this.featureService.getPollingTime());
    this.getDetailedResultRateLimit();
    this.resetStopSubject();
    return this.queryProviderService.getActiveFeasibilityQuery().pipe(
      switchMap((query) => {
        feasibilityQuery = query;
        this.setFeasibilityQueryID(query.getID());
        return this.getPollingUrl(query);
      }),
      switchMap((url) => {
        this.queryId = url.substring(url.lastIndexOf('/') + 1);
        feasibilityQuery.addResultId(this.queryId);
        return this.getResultPolling(this.queryId, false).pipe(
          filter((result) => result != null),
          takeUntil(this.stopPolling$), // Stops polling when stopPolling$ emits

          endWith(null)
        );
      }),
      takeWhile((x) => {
        if (x === null) {
          if (this.result.issues[0].code) {
            this.snackbar.displayErrorMessage(this.result.issues[0].code);
          }
        }
        return x != null;
      })
    );
  }

  private getDetailedResultRateLimit(): void {
    this.feasibilityQueryResultApiService.getDetailedResultRateLimit().subscribe((result) => {
      this.callsLimitSubject.next(result.limit);
      this.callsRemainingSubject.next(result.remaining);
    });
  }

  public getResultCallsRemaining(): Observable<number> {
    return this.callsLimit$.pipe(
      switchMap((limit) => this.callsRemaining$.pipe(map((remaining) => limit - remaining)))
    );
  }

  public setFeasibilityQueryID(id: string): void {
    this.feasibilityQueryID = id;
  }

  public getPollingUrl(query: FeasibilityQuery): Observable<string> {
    return this.feasibilityQueryApiService
      .postStructuredQuery(this.translator.translateToStructuredQuery(query))
      .pipe(map((result) => result.headers.get('location')));
  }

  public getResultPolling(
    feasibilityQueryResultId: string,
    withDetails: boolean
  ): Observable<QueryResult> {
    return interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 200)),
      switchMap(() => this.getSummaryResult(feasibilityQueryResultId)),
      share()
    );
  }

  public getSummaryResult(feasibilityQueryResultId: string): Observable<QueryResult> {
    return this.feasibilityQueryResultApiService.getSummaryResult(feasibilityQueryResultId).pipe(
      map((result) => {
        this.result = result;
        if (!result.issues) {
          const queryResult: QueryResult = this.buildQueryResultInstance(result);
          this.resultProvider.setResultByID(queryResult, queryResult.getId());
          return queryResult;
        }
      })
    );
  }

  public getDetailedObfuscatedResult(feasibilityQueryResultId: string): Observable<QueryResult> {
    return this.feasibilityQueryResultApiService
      .getDetailedObfuscatedResult(feasibilityQueryResultId)
      .pipe(
        map((result) => {
          if (!result.issues) {
            const queryResult: QueryResult = this.buildQueryResultInstance(result);
            this.resultProvider.setResultByID(queryResult, queryResult.getId());
            return queryResult;
          }
        })
      );
  }

  private buildQueryResultInstance(result: any): QueryResult {
    return new QueryResult(
      this.feasibilityQueryID,
      result.totalNumberOfPatients,
      result.queryId.toString(),
      result.resultLines.map((line) => new QueryResultLine(line?.numberOfPatients, line?.siteName)),
      result.issues
    );
  }

  public stopPolling() {
    this.stopPolling$.next();
  }

  private resetStopSubject() {
    if (this.stopPolling$.closed) {
      this.stopPolling$ = new Subject<void>();
    }
  }
}
