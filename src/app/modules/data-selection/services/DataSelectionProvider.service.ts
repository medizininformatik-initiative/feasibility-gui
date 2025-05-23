import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class DataSelectionProviderService {
  private dataSelectionUIDMap: Map<string, DataSelection> = new Map();
  private dataSelectionUIDMapSubject: BehaviorSubject<Map<string, DataSelection>> =
    new BehaviorSubject(new Map());

  constructor(private activeDataSelection: ActiveDataSelectionService) {}

  public initializeDataSelectionInstance(mainProfile: DataSelectionProfile): Observable<boolean> {
    const dataSelection: DataSelection = new DataSelection([], uuidv4());
    this.setDataSelectionByUID(dataSelection.getId(), dataSelection);
    this.activeDataSelection.setActiveDataSelectionID(dataSelection.getId());
    dataSelection.setProfiles([mainProfile]);
    return of(true);
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

  public getProfilesFromActiveDataSelection(): Observable<DataSelectionProfile[]> {
    return this.activeDataSelection
      .getActiveDataSelectionIdObservable()
      .pipe(
        switchMap((id) =>
          this.dataSelectionUIDMapSubject.pipe(
            map((dataSelectionUIDMap) => dataSelectionUIDMap.get(id).getProfiles())
          )
        )
      );
  }

  public setProfilesInActiveDataSelection(profiles: DataSelectionProfile[]): Observable<void> {
    return this.activeDataSelection
      .getActiveDataSelectionIdObservable()
      .pipe(
        switchMap((id) => profiles.map((profile) => this.setProfileInDataSelection(id, profile)))
      );
  }

  public setProfileInActiveDataSelection(profile: DataSelectionProfile): Observable<void> {
    return this.activeDataSelection
      .getActiveDataSelectionIdObservable()
      .pipe(map((id) => this.setProfileInDataSelection(id, profile)));
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

  public removeProfileFromDataSelection(dataSelectionId: string, profileId: string): void {
    const dataSelection = this.dataSelectionUIDMap.get(dataSelectionId);

    if (dataSelection) {
      const updatedElements = dataSelection
        .getProfiles()
        .filter((profile: DataSelectionProfile) => profile.getId() !== profileId);
      this.createDataSelectionInstanceAndSetMap(updatedElements, dataSelectionId);
    }
  }

  public setProfileInDataSelection(dataSelectionId: string, profile: DataSelectionProfile): void {
    const dataSelection = this.dataSelectionUIDMap.get(dataSelectionId);
    if (dataSelection) {
      const updatedElements = dataSelection
        .getProfiles()
        .filter((existingProfile) => existingProfile.getId() !== profile.getId());
      updatedElements.push(profile);
      this.createDataSelectionInstanceAndSetMap(updatedElements, dataSelectionId);
    }
  }

  private createDataSelectionInstanceAndSetMap(
    updatedElements: DataSelectionProfile[],
    dataSelectionId: string
  ) {
    const updatedDataSelection = new DataSelection(updatedElements, dataSelectionId);
    this.setDataSelectionByUID(updatedDataSelection.getId(), updatedDataSelection, true);
  }

  public resetDataSelectionMap(): void {
    this.dataSelectionUIDMapSubject.next(new Map());
  }

  public clearDataSelection(): void {
    const dataSelection: DataSelection = new DataSelection([], uuidv4());
    this.setDataSelectionByUID(dataSelection.getId(), dataSelection, true);
  }
}
