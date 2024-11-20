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

  public setDataSelectionByUID(
    id: string,
    dataSelection: DataSelection,
    setAsActive: boolean = false
  ): void {
    this.dataSelectionUIDMap.set(id, dataSelection);
    this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
    if (setAsActive) {
      this.activeDataSelection.setActiveDataSelectionID(id);
    }
  }

  public removeDataSelectionByUID(uid: string): void {
    if (this.dataSelectionUIDMap.has(uid)) {
      this.dataSelectionUIDMap.delete(uid);
      this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
    }
  }

  public removeProfileFromDataSelection(dataSelectionId: string, profileUrl: string): void {
    const dataSelection = this.dataSelectionUIDMap.get(dataSelectionId);

    if (dataSelection) {
      const updatedElements = dataSelection
        .getProfiles()
        .filter((profile: DataSelectionProfileProfile) => profile.getUrl() !== profileUrl);
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
        .getProfiles()
        .map((existingProfile: DataSelectionProfileProfile) =>
          existingProfile.getUrl() === profile.getUrl() ? profile : existingProfile
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

  public resetDataSelectionMap(): void {
    this.dataSelectionUIDMapSubject.next(new Map());
  }
}
