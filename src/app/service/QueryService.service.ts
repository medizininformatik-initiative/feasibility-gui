import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Query } from '../model/FeasibilityQuery/Query';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private feasibilityQuery: BehaviorSubject<Query> = new BehaviorSubject(new Query());

  public constructor() {}

  public setFeasibilityQuery(feasibilityQuery: Query) {
    this.feasibilityQuery.next(feasibilityQuery);
  }

  /**
   * Accessing the data asynchronously --> You need to subscribe
   *
   * @returns Observable<Query>
   */
  public getFeasibilityQuery(): Observable<Query> {
    return this.feasibilityQuery.asObservable();
  }

  public resetToDefaultQuery(): void {
    const defaultQuery = new Query();
    this.feasibilityQuery.next(defaultQuery);
  }
}
