import { BehaviorSubject, Observable } from 'rxjs';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileProviderService {
  private profileIdMap: Map<string, DataSelectionProfile> = new Map();
  private profileUrlMapSubject: BehaviorSubject<Map<string, DataSelectionProfile>> =
    new BehaviorSubject(new Map());

  constructor() {}

  public getProfileIdMap(): Observable<Map<string, DataSelectionProfile>> {
    return this.profileUrlMapSubject.asObservable();
  }

  public getProfileById(id: string): DataSelectionProfile {
    return this.profileIdMap.get(id);
  }

  public setProfileById(url: string, profile: DataSelectionProfile): void {
    this.profileIdMap.set(url, profile);
    this.profileUrlMapSubject.next(new Map(this.profileIdMap));
  }

  public removeProfileById(url: string): void {
    if (this.profileIdMap.has(url)) {
      this.profileIdMap.delete(url);
      this.profileUrlMapSubject.next(new Map(this.profileIdMap));
    }
  }

  public resetProfileMap(): void {
    this.profileIdMap.clear();
    this.profileUrlMapSubject.next(new Map());
  }
}
