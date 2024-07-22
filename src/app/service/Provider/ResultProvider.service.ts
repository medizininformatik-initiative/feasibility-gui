import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { FeasibilityQueryProviderService } from './FeasibilityQueryProvider.service';
import { QueryResult } from '../../model/Result/QueryResult';

@Injectable({
  providedIn: 'root',
})
export class ResultProviderService {
  private resultMap: Map<string, QueryResult> = new Map();
  private resultMapSubject: BehaviorSubject<Map<string, QueryResult>> = new BehaviorSubject(
    new Map()
  );

  constructor() {}

  /**
   * Retrieves the observable of the criterion UID map.
   *
   * @returns Observable<Map<string, Criterion>>
   */
  public getResultMap(): Observable<Map<string, QueryResult>> {
    return this.resultMapSubject.asObservable();
  }

  /**
   * Retrieves a criterion by UID from the map.
   *
   * @param uid The unique ID of the criterion
   * @returns Criterion | undefined
   */
  public getResultByID(id: string): QueryResult | undefined {
    return this.resultMap.get(id);
  }

  /**
   * Sets a criterion by its unique ID and updates the map.
   *
   * @param criterion The criterion to set
   */
  public setResultByID(result: QueryResult): void {
    this.resultMap.set(result.getQueryId(), result);
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
}
