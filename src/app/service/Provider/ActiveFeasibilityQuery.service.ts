import { BehaviorSubject, Observable } from 'rxjs';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActiveFeasibilityQueryService {
  /**
   * BehaviorSubject that holds the state of the active FeasibilityQuery.
   * Initialized with `null` as the default value.
   */
  private activeFeasibilityQuerySubject: BehaviorSubject<FeasibilityQuery | null> =
    new BehaviorSubject<FeasibilityQuery | null>(null);

  /**
   * Observable of the active FeasibilityQuery.
   * Use this to subscribe and get updates when the active FeasibilityQuery changes.
   */
  public activeFeasibilityQuery$ = this.activeFeasibilityQuerySubject.asObservable();

  constructor() {}

  /**
   * Getter method to retrieve the current value of the active FeasibilityQuery.
   *
   * @returns The current active FeasibilityQuery or null if not set.
   */
  public getActiveFeasibilityQuery(): Observable<FeasibilityQuery> | null {
    return this.activeFeasibilityQuerySubject.asObservable();
  }

  /**
   * Setter method to update the active FeasibilityQuery.
   *
   * @param query - The FeasibilityQuery instance to set as active.
   */
  public setActiveFeasibilityQuery(query: FeasibilityQuery): void {
    this.activeFeasibilityQuerySubject.next(query);
  }
}
