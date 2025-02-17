import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StageProviderService {
  private stageUIDArray: Array<string> = new Array<string>();
  private StageUIDArraySubject: BehaviorSubject<Array<string>> = new BehaviorSubject(new Array());

  constructor() {}

  /**
   * Retrieves the observable of the criterion UID map.
   *
   * @returns Observable<Map<string, Criterion>>
   */
  public getStageUIDArray(): Observable<Array<string>> {
    return this.StageUIDArraySubject.asObservable();
  }

  /**
   * Sets a criterion by its unique ID and updates the map.
   *
   * @param criterion The criterion to set
   */
  public addCriterionToStage(uid: string): void {
    this.stageUIDArray.push(uid);
    this.StageUIDArraySubject.next(this.stageUIDArray);
  }

  /**
   * Sets criterions by its unique ID and updates the map.
   *
   * @param criterion The criterion to set
   */
  public addCriteriaToStage(ids: string[]): void {
    this.stageUIDArray.push(...ids);
    this.StageUIDArraySubject.next(this.stageUIDArray);
  }

  /**
   * Deletes a criterion by its UID from the map.
   *
   * @param uid The unique ID of the criterion to delete
   */
  public deleteCriterionByUID(uid: string): void {
    this.stageUIDArray = this.stageUIDArray.filter((item) => item !== uid);
    this.StageUIDArraySubject.next(this.stageUIDArray);
  }
}
