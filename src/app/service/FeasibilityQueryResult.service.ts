import { FeasibilityQuery } from '../model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from './Provider/FeasibilityQueryProvider.service';
import { FeatureService } from './Feature.service';
import { Injectable } from '@angular/core';
import { ObfuscatedResultRateLimitService } from './FeasibilityQuery/Result/ObfuscatedResultRateLimit.service';
import { ObfuscatedResultService } from './FeasibilityQuery/Result/ObfuscatedResult.service';
import { PollingService } from './FeasibilityQuery/Result/Polling.service';
import { QueryResult } from '../model/Result/QueryResult';
import { QueryResultMapperService } from './FeasibilityQuery/Result/QueryResultMapper.service';
import { QueryResultRateLimit } from '../model/Result/QueryResultRateLimit';
import { ResultProviderService } from './Provider/ResultProvider.service';
import { endWith, map, Observable, switchMap, takeWhile, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryResultService {
  resultObservable$: Observable<QueryResult>;
  private feasibilityQueryID: string;

  private queryId: string;

  public getQueryId(): string {
    return this.queryId;
  }

  constructor(
    private featureService: FeatureService,
    private queryProviderService: FeasibilityQueryProviderService,
    private pollingService: PollingService,
    private queryResultMapperService: QueryResultMapperService,
    private resultProvider: ResultProviderService,
    private obfuscatedResultRateLimitService: ObfuscatedResultRateLimitService,
    private obfuscatedResultService: ObfuscatedResultService
  ) {
    this.obfuscatedResultRateLimitService.refreshRateLimit();
  }

  /**
   * The feasibility query being sent is retrieved from the Active Feasibility Query Service.
   * This ensures that the results are always based on the current active feasibility query
   */
  public doSendQueryRequest(): Observable<QueryResult> {
    this.featureService.sendClickEvent(this.featureService.getPollingTime());
    this.obfuscatedResultRateLimitService.refreshRateLimit();

    return this.queryProviderService
      .getActiveFeasibilityQuery()
      .pipe(switchMap((feasibilityQuery) => this.handleFeasibilityQuery(feasibilityQuery)));
  }

  private handleFeasibilityQuery(feasibilityQuery: FeasibilityQuery): Observable<QueryResult> {
    return this.pollingService
      .getPollingUrl(feasibilityQuery)
      .pipe(switchMap((pollingUrl) => this.startPollingProcess(feasibilityQuery, pollingUrl)));
  }

  private startPollingProcess(
    feasibilityQuery: FeasibilityQuery,
    pollingUrl: string
  ): Observable<QueryResult> {
    this.queryId = pollingUrl.substring(pollingUrl.lastIndexOf('/') + 1);
    feasibilityQuery.addResultId(this.queryId);

    return this.pollingService.startPolling(this.queryId).pipe(
      map((pollingResult) => this.processPollingResult(pollingResult)),
      filter((result) => result != null),
      takeWhile((result) => result !== null),
      endWith(null)
    );
  }

  private processPollingResult(pollingResult: any): QueryResult {
    const queryResult = this.mapQueryResult(pollingResult, this.feasibilityQueryID);
    this.setQueryResultProvider(queryResult);
    return queryResult;
  }

  public getDetailedResultRateLimit(): Observable<QueryResultRateLimit> {
    return this.obfuscatedResultRateLimitService.getRateLimit();
  }

  public setFeasibilityQueryID(id: string): void {
    this.feasibilityQueryID = id;
  }

  public getDetailedObfuscatedResult(feasibilityQueryResultId: string): Observable<QueryResult> {
    return this.obfuscatedResultService.getDetailedObfuscatedResult(feasibilityQueryResultId).pipe(
      map((result) => {
        console.log('result', result);
        const queryResult = this.mapQueryResult(result, this.feasibilityQueryID);
        this.setQueryResultProvider(queryResult);
        return queryResult;
      })
    );
  }

  private mapQueryResult(result, feasibilityQueryId: string): QueryResult {
    const queryResult: QueryResult = this.queryResultMapperService.createQueryResult(
      result,
      feasibilityQueryId
    );
    return queryResult;
  }

  private setQueryResultProvider(queryResult: QueryResult): void {
    this.resultProvider.setResultByID(queryResult, queryResult.getId());
  }
}
