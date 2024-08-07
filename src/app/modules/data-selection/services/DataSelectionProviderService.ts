import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProviderService {
  private dataSelectionProfileUIDMap: Map<string, DataSelectionProfileProfile> = new Map();
  private dataSelectionProfileUIDMapSubject: BehaviorSubject<
    Map<string, DataSelectionProfileProfile>
  > = new BehaviorSubject(new Map());

  public getDataSelectionProfileUIDMap(): Observable<Map<string, DataSelectionProfileProfile>> {
    return this.dataSelectionProfileUIDMapSubject.asObservable();
  }

  public getDataSelectionProfileByUID(uid: string): DataSelectionProfileProfile | undefined {
    return this.dataSelectionProfileUIDMap.get(uid);
  }
}
