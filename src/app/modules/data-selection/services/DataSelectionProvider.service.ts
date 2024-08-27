import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
@Injectable({
  providedIn: 'root',
})
export class DataSelectionProviderService {
  private dataSelectionUIDMap: Map<string, DataSelection> = new Map();
  private dataSelectionUIDMapSubject: BehaviorSubject<Map<string, DataSelection>> =
    new BehaviorSubject(new Map());

  public getDataSelectionUIDMap(): Observable<Map<string, DataSelection>> {
    return this.dataSelectionUIDMapSubject.asObservable();
  }

  public getDataSelectionMap(): Observable<Map<string, DataSelection>> | undefined {
    return this.dataSelectionUIDMapSubject.asObservable();
  }

  public setDataSelectionByUID(uid: string, dataSelection: DataSelection): void {
    this.dataSelectionUIDMap.set(uid, dataSelection);
    this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
  }

  public removeDataSelectionByUID(uid: string): void {
    if (this.dataSelectionUIDMap.has(uid)) {
      this.dataSelectionUIDMap.delete(uid);
      this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
    }
  }

  public removeElementFromDataSelectionMap(
    uid: string,
    dataSelectionProfileProfileId: string
  ): void {
    const dataSelection = this.dataSelectionUIDMap.get(uid);

    if (dataSelection) {
      const updatedElements = dataSelection
        .getDataSelection()
        .filter(
          (profile: DataSelectionProfileProfile) =>
            profile.getUrl() !== dataSelectionProfileProfileId
        );
      const updatedDataSelection = new DataSelection(updatedElements);

      this.dataSelectionUIDMap.set(uid, updatedDataSelection);
      this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
    }
  }

  public setElementInDataSelectionMap(uid: string, profile: DataSelectionProfileProfile): void {
    const dataSelection = this.dataSelectionUIDMap.get(uid);

    if (dataSelection) {
      const updatedElements = dataSelection
        .getDataSelection()
        .map((existingProfile: DataSelectionProfileProfile) =>
          existingProfile.getUrl() === profile.getUrl() ? profile : existingProfile
        );
      if (!updatedElements.includes(profile)) {
        updatedElements.push(profile);
      }
      const updatedDataSelection = new DataSelection(updatedElements);
      this.dataSelectionUIDMap.set(uid, updatedDataSelection);
    }

    this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
  }
}
