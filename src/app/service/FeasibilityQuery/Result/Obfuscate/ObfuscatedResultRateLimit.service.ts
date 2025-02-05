import { BehaviorSubject, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { QueryResultRateLimit } from 'src/app/model/Result/QueryResultRateLimit';
import { FeasibilityQueryResultApiService } from 'src/app/service/Backend/Api/FeasibilityQueryResultApi.service';

@Injectable({
  providedIn: 'root',
})
export class ObfuscatedResultRateLimitService {
  private updateTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(private feasibilityQueryResultApiService: FeasibilityQueryResultApiService) {}

  /**
   * Fetches, caches, and provides the latest rate limit.
   */
  private rateLimit$: Observable<QueryResultRateLimit> = this.updateTrigger$.pipe(
    switchMap(() =>
      this.feasibilityQueryResultApiService
        .getDetailedResultRateLimit()
        .pipe(map((result) => this.createResultRateLimit(result)))
    ),
    shareReplay(1)
  );

  private createResultRateLimit(result: any): QueryResultRateLimit {
    return new QueryResultRateLimit(result.limit, result.remaining);
  }

  /**
   * Public getter to expose the latest rate limit.
   */
  public getRateLimit(): Observable<QueryResultRateLimit> {
    return this.rateLimit$;
  }

  /**
   * Manually triggers an update for the rate limits.
   */
  public refreshRateLimit(): void {
    this.updateTrigger$.next();
  }
}
