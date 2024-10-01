import { BackendService } from '../modules/querybuilder/service/backend.service';
import { FeasibilityQuery } from '../model/FeasibilityQuery/FeasibilityQuery';
import { FeatureService } from './Feature.service';
import { Injectable } from '@angular/core';
import {
  endWith,
  interval,
  map,
  Observable,
  share,
  switchMap,
  takeUntil,
  takeWhile,
  timer,
} from 'rxjs';
import { QueryResult } from '../model/Result/QueryResult';
import { QueryResultLine } from '../model/Result/QueryResultLine';
import { ResultProviderService } from './Provider/ResultProvider.service';
import { SnackbarService } from '../core/components/snack-bar/snack-bar.component';
import { UIQuery2StructuredQueryService } from './Translator/StructureQuery/UIQuery2StructuredQuery.service';
import { FeasibilityQueryProviderService } from './Provider/FeasibilityQueryProvider.service';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryResultService {
  readonly POLLING_INTERVALL_MILLISECONDS = this.featureService.getPollingIntervall() * 1000;
  readonly POLLING_MAXL_MILLISECONDS = this.featureService.getPollingTime() * 1000;
  resultObservable$: Observable<QueryResult>;
  private feasibilityQueryID: string;

  private callsLimit: number;
  private callsRemaining: number;
  private queryId: string;

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
    private backend: BackendService,
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
    return this.queryProviderService.getActiveFeasibilityQuery().pipe(
      switchMap((query) => {
        feasibilityQuery = query;
        this.setFeasibilityQueryID(query.getID());
        return this.getPollingUrl(query);
      }),
      switchMap((url) => {
        this.queryId = url.substring(url.lastIndexOf('/') + 1);
        feasibilityQuery.addResultId(this.queryId);
        return this.getResultPolling(url, false).pipe(endWith(null));
      }),
      takeWhile((x) => x != null)
    );
  }

  private getDetailedResultRateLimit(): void {
    this.backend.getDetailedResultRateLimit().subscribe(
      (result) => {
        this.callsLimit = result.limit;
        this.callsRemaining = result.remaining;
      },
      (error) => {
        if (error.error.issues !== undefined) {
          if (error.error.issues[0].code !== undefined) {
            //this.snackbar.displayErrorMessage(error.error.issues[0].code);
          }
        }
      }
    );
  }

  public setFeasibilityQueryID(id: string): void {
    this.feasibilityQueryID = id;
  }

  public getPollingUrl(query: FeasibilityQuery): Observable<string> {
    return this.backend
      .postQueryNew(this.translator.translateToStructuredQuery(query))
      .pipe(map((result) => result.headers.get('location')));
  }

  public getResultPolling(resultUrl: string, withDetails: boolean): Observable<QueryResult> {
    return interval(this.POLLING_INTERVALL_MILLISECONDS).pipe(
      takeUntil(timer(this.POLLING_MAXL_MILLISECONDS + 100)),
      switchMap(() => this.getResult(resultUrl, withDetails)),
      share()
    );
  }

  public getResult(resultUrl: string, withDetails: boolean): Observable<QueryResult> {
    const url: string = withDetails
      ? resultUrl + '/detailed-obfuscated-result'
      : resultUrl + '/summary-result';
    return (
      this.backend
        //.getSummaryResult(url)
        .getDetailedResult(url, false)
        .pipe(
          map((result) => {
            if (!result.issues) {
              const queryResult: QueryResult = this.buildQueryResultInstance(result);
              this.resultProvider.setResultByID(queryResult, queryResult.getQueryId());
              return queryResult;
            } else {
              this.snackbar.displayErrorMessage(this.snackbar.errorCodes[result.issues[0].code]);
            }
          })
        )
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
}
