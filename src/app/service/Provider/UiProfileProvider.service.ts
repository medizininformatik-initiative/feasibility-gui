import { Injectable } from '@angular/core';
import { UiProfileData } from 'src/app/model/Interface/UiProfileData';

@Injectable({
  providedIn: 'root',
})
export class UiProfileProviderService {
  private uiProfilesCache: Map<string, UiProfileData> = new Map();
  constructor() {}

  public getUiProfileById(id: string): UiProfileData | undefined {
    return this.uiProfilesCache.get(id);
  }

  public cacheUiProfile(uiProfile: UiProfileData): void {
    this.uiProfilesCache.set(uiProfile.name, uiProfile);
  }

  public cacheUiProfiles(uiProfiles: UiProfileData[]): void {
    uiProfiles.forEach((profile: UiProfileData) => this.cacheUiProfile(profile));
  }
}
