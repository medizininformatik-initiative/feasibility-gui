import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { FeatureService } from '../../Feature.service';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, takeWhile } from 'rxjs';
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
    private featureService: FeatureService,
    private queryProviderService: FeasibilityQueryProviderService,
    private pollingManagerService: PollingManagerService,
    private resultProvider: ResultProviderService,
    private obfuscatedResultRateLimitService: ObfuscatedResultRateLimitService,
    private obfuscatedResultService: ObfuscatedResultService
  ) {}

  public getDetailedResultRateLimit(): Observable<QueryResultRateLimit> {
    return this.obfuscatedResultRateLimitService.getRateLimit();
  }

  public doSendQueryRequest(): Observable<QueryResult> {
    this.featureService.sendClickEvent(this.featureService.getPollingTime());
    this.obfuscatedResultRateLimitService.refreshRateLimit();

    return this.queryProviderService.getActiveFeasibilityQuery().pipe(
      switchMap((feasibilityQuery) =>
        this.pollingManagerService.getPollingResult(feasibilityQuery).pipe(
          map((queryResult) => {
            if (queryResult !== null) {
              this.setQueryResultProvider(queryResult);
            }
            console.log(queryResult);
            return queryResult;
          })
        )
      )
    );
  }

  public getDetailedObfuscatedResult(feasibilityQueryResultId: string): Observable<QueryResult> {
    return this.queryProviderService.getActiveFeasibilityQuery().pipe(
      switchMap((feasibilityQuery: FeasibilityQuery) =>
        this.obfuscatedResultService
          .getDetailedObfuscatedResult(feasibilityQueryResultId, feasibilityQuery.getID())
          .pipe(
            map((queryResult: QueryResult) => {
              this.setQueryResultProvider(queryResult);
              return queryResult;
            })
          )
      )
    );
  }

  private setQueryResultProvider(queryResult: QueryResult): void {
    this.resultProvider.setResultByID(queryResult, queryResult.getId());
  }
}
