import { AppSettingsProviderService } from '../../Config/AppSettingsProvider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ObfuscatedResultRateLimitService } from './Obfuscate/ObfuscatedResultRateLimit.service';
import { ObfuscatedResultService } from './Obfuscate/ObfuscatedResult.service';
import { PollingManagerService } from './Polling/PollingManager.service';
import { QueryResult } from '../../../model/Result/QueryResult';
import { QueryResultRateLimit } from '../../../model/Result/QueryResultRateLimit';
import { ResultProviderService } from '../../Provider/ResultProvider.service';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryResultService {
  constructor(
    private appSettingsProviderService: AppSettingsProviderService,
    private queryProviderService: FeasibilityQueryProviderService,
    private pollingManagerService: PollingManagerService,
    private resultProvider: ResultProviderService,
    private obfuscatedResultRateLimitService: ObfuscatedResultRateLimitService,
    private obfuscatedResultService: ObfuscatedResultService
  ) {}

  public getDetailedResultRateLimit(): Observable<QueryResultRateLimit> {
    return this.obfuscatedResultRateLimitService.getRateLimit();
  }

  public refreshResultRateLimit(): void {
    return this.obfuscatedResultRateLimitService.refreshRateLimit();
  }

  public doSendQueryRequest(): Observable<QueryResult> {
    this.appSettingsProviderService.getPollingTime();
    this.obfuscatedResultRateLimitService.refreshRateLimit();

    return this.activeFeasibilityQuery().pipe(
      switchMap((feasibilityQuery) => {
        const result = this.pollingManagerService.getPollingResult(feasibilityQuery);
        return this.setProvider(result);
      })
    );
  }

  public getDetailedObfuscatedResult(feasibilityQueryResultId: string): Observable<QueryResult> {
    return this.activeFeasibilityQuery().pipe(
      switchMap((feasibilityQuery: FeasibilityQuery) => {
        const result = this.obfuscatedResultService.getDetailedObfuscatedResult(
          feasibilityQueryResultId,
          feasibilityQuery.getId()
        );
        return this.setProvider(result);
      })
    );
  }

  private setProvider(result: Observable<QueryResult>): Observable<QueryResult> {
    return result.pipe(
      map((queryResult: QueryResult) => {
        if (queryResult?.getTotalNumberOfPatients() !== null && queryResult !== null) {
          this.setQueryResultProvider(queryResult);
          return queryResult;
        } else {
          return queryResult;
        }
      })
    );
  }

  private activeFeasibilityQuery(): Observable<FeasibilityQuery> {
    return this.queryProviderService.getActiveFeasibilityQuery();
  }

  private setQueryResultProvider(queryResult: QueryResult): void {
    this.resultProvider.setResultByID(queryResult, queryResult.getId());
  }

  public stopPolling(): void {
    this.pollingManagerService.stopPolling();
  }
}
