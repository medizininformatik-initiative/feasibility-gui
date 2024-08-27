import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProviderService } from './DataSelectionProvider.service';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProfileProviderService {
  private dataSelectionProfileUIDMap: Map<string, DataSelectionProfileProfile> = new Map();
  private dataSelectionProfileUIDMapSubject: BehaviorSubject<
    Map<string, DataSelectionProfileProfile>
  > = new BehaviorSubject(new Map());

  constructor() {}

  public getDataSelectionProfileUIDMap(): Observable<Map<string, DataSelectionProfileProfile>> {
    return this.dataSelectionProfileUIDMapSubject.asObservable();
  }

  public getDataSelectionProfileByUID(uid: string): DataSelectionProfileProfile | undefined {
    return this.dataSelectionProfileUIDMap.get(uid);
  }

  public setDataSelectionProfileByUID(uid: string, profile: DataSelectionProfileProfile): void {
    this.dataSelectionProfileUIDMap.set(uid, profile);
    this.dataSelectionProfileUIDMapSubject.next(new Map(this.dataSelectionProfileUIDMap));
  }

  public removeDataSelectionProfileByUID(uid: string): void {
    if (this.dataSelectionProfileUIDMap.has(uid)) {
      this.dataSelectionProfileUIDMap.delete(uid);
      this.dataSelectionProfileUIDMapSubject.next(new Map(this.dataSelectionProfileUIDMap));
    }
  }
}
