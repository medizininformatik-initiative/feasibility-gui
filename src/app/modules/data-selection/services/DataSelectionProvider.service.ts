import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class DataSelectionProviderService {
  private dataSelectionUIDMap: Map<string, DataSelection> = new Map();
  private dataSelectionUIDMapSubject: BehaviorSubject<Map<string, DataSelection>> =
    new BehaviorSubject(new Map());

  constructor(private activeDataSelection: ActiveDataSelectionService) {
    this.initializeDataSelectionInstance();
  }

  private initializeDataSelectionInstance(): void {
    const dataSelection: DataSelection = new DataSelection([], uuidv4());
    this.setDataSelectionByUID(dataSelection.getId(), dataSelection);
    this.activeDataSelection.setActiveDataSelectionID(dataSelection.getId());
  }

  public getDataSelectionUIDMap(): Observable<Map<string, DataSelection>> {
    return this.dataSelectionUIDMapSubject.asObservable();
  }

  public getDataSelectionByUID(id: string): Observable<DataSelection> {
    return this.dataSelectionUIDMapSubject.pipe(
      map((dataSelectionUIDMap) => dataSelectionUIDMap.get(id))
    );
  }

  public getActiveDataSelection(): Observable<DataSelection> {
    return this.activeDataSelection
      .getActiveDataSelectionIdObservable()
      .pipe(
        switchMap((id) =>
          this.dataSelectionUIDMapSubject.pipe(
            map((dataSelectionUIDMap) => dataSelectionUIDMap.get(id))
          )
        )
      );
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

  public removeProfileFromDataSelection(dataSelectionId: string, profileId: string): void {
    const dataSelection = this.dataSelectionUIDMap.get(dataSelectionId);

    if (dataSelection) {
      const updatedElements = dataSelection
        .getDataSelection()
        .filter((profile: DataSelectionProfileProfile) => profile.getId() !== profileId);
      this.createDataSelectionInstanceAndSetMap(updatedElements, dataSelectionId);
    }
  }

  public setProfileInDataSelection(
    dataSelectionId: string,
    profile: DataSelectionProfileProfile
  ): void {
    const dataSelection = this.dataSelectionUIDMap.get(dataSelectionId);
    if (dataSelection) {
      const updatedElements = dataSelection
        .getDataSelection()
        .map((existingProfile: DataSelectionProfileProfile) =>
          existingProfile.getId() === profile.getId() ? profile : existingProfile
        );
      if (!updatedElements.includes(profile)) {
        updatedElements.push(profile);
      }
      this.createDataSelectionInstanceAndSetMap(updatedElements, dataSelectionId);
    }
  }

  private createDataSelectionInstanceAndSetMap(
    updatedElements: DataSelectionProfileProfile[],
    dataSelectionId: string
  ) {
    const updatedDataSelection = new DataSelection(updatedElements, dataSelectionId);
    this.dataSelectionUIDMap.set(dataSelectionId, updatedDataSelection);
    this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
  }
}
