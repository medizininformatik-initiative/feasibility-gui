import { BehaviorSubject, Observable } from 'rxjs';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileProviderService {
  private profileUrlMap: Map<string, DataSelectionProfile> = new Map();
  private profileUrlMapSubject: BehaviorSubject<Map<string, DataSelectionProfile>> =
    new BehaviorSubject(new Map());

  constructor() {}

  public getProfileIdMap(): Observable<Map<string, DataSelectionProfile>> {
    return this.profileUrlMapSubject.asObservable();
  }

  public getProfileById(url: string): DataSelectionProfile | undefined {
    return this.profileUrlMap.get(url);
  }

  public setProfileById(url: string, profile: DataSelectionProfile): void {
    this.profileUrlMap.set(url, profile);
    this.profileUrlMapSubject.next(new Map(this.profileUrlMap));
  }

  public removeProfileById(url: string): void {
    if (this.profileUrlMap.has(url)) {
      this.profileUrlMap.delete(url);
      this.profileUrlMapSubject.next(new Map(this.profileUrlMap));
    }
  }

  public resetProfileMap(): void {
    this.profileUrlMap.clear();
    this.profileUrlMapSubject.next(new Map());
  }
}
