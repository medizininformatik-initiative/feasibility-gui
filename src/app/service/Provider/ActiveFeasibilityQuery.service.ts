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
  private activeFeasibilityQueryIDSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  /**
   * Observable of the active FeasibilityQueryID.
   * Use this to subscribe and get updates when the active FeasibilityQueryID changes.
   */
  public activeFeasibilityIDQuery$ = this.activeFeasibilityQueryIDSubject.asObservable();
  private activeFeasibilityQueryID: string;

  constructor() {}

  /**
   * Getter method to retrieve the current value of the active FeasibilityQueryID.
   *
   * @returns The current active FeasibilityQueryID or null if not set.
   */
  public getActiveFeasibilityQueryIDObservable(): Observable<string> | null {
    return this.activeFeasibilityQueryIDSubject.asObservable();
  }

  public getActiveFeasibilityQueryID(): string | null {
    return this.activeFeasibilityQueryID;
  }
  /**
   * Setter method to update the active FeasibilityQueryID.
   *
   * @param queryID - The FeasibilityQueryID instance to set as active.
   */
  public setActiveFeasibilityQueryID(queryID: string): void {
    this.activeFeasibilityQueryID = queryID;
    this.activeFeasibilityQueryIDSubject.next(queryID);
  }
}
