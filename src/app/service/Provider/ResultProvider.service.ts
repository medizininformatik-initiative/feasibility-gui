import { ActiveFeasibilityQueryService } from './ActiveFeasibilityQuery.service';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from './FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { QueryResult } from '../../model/Result/QueryResult';

@Injectable({
  providedIn: 'root',
})
export class ResultProviderService {
  private resultMap: Map<string, QueryResult> = new Map();
  private resultMapSubject: BehaviorSubject<Map<string, QueryResult>> = new BehaviorSubject(
    new Map()
  );

  constructor(private feasibilityQueryProvider: FeasibilityQueryProviderService) {}

  /**
   * Retrieves the observable of the Result UID map.
   *
   * @returns Observable<Map<string, QueryResult>>
   */
  public getResultMap(): Observable<Map<string, QueryResult>> {
    return this.resultMapSubject.asObservable();
  }

  /**
   * Retrieves a QueryResult by UID from the map.
   *
   * @param id The unique ID of the QueryResult
   * @returns QueryResult
   */
  public getResultByID(id: string): QueryResult {
    return this.resultMap.get(id);
  }

  /**
   * Sets a QueryResult by its unique ID and updates the map.
   *
   * @param QueryResult The criterion to set
   */
  public setResultByID(result: QueryResult, id: string): void {
    this.resultMap.set(id, result);
    this.resultMapSubject.next(new Map(this.resultMap));
  }

  /**
   * Deletes a criterion by its UID from the map.
   *
   * @param uid The unique ID of the criterion to delete
   */
  public deleteResultByID(id: string): void {
    this.resultMap.delete(id);
    this.resultMapSubject.next(new Map(this.resultMap));
  }

  public getResultOfActiveFeasibilityQuery(): Observable<QueryResult | undefined> {
    return this.feasibilityQueryProvider
      .getActiveFeasibilityQuery()
      .pipe(switchMap((feasibilityQuery: FeasibilityQuery) => this.getLastResult(feasibilityQuery)));
  }

  private getLastResult(feasibilityQuery: FeasibilityQuery): Observable<QueryResult | undefined> {
    const resultIds = feasibilityQuery.getResultIds();

    if (!resultIds || resultIds.length === 0) {
      return of(undefined);
    }
    const lastResultId = resultIds[resultIds.length - 1];
    return of(this.getResultByID(lastResultId));
  }
}
