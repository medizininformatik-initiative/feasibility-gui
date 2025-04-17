import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';

@Injectable({
  providedIn: 'root',
})
/**
 * Service to manage URLs associated with reference fields in profiles.
 * This service allows adding, removing, and clearing URLs for specific reference fields within profiles.
 * A map of profileId -> (elementId -> array of URLs)
 */
export class StagedReferenceProfileUrlsProviderService {
  private stagedReferenceProfileUrlsMapSubject = new BehaviorSubject<
    Map<string, Map<string, string[]>>
  >(new Map());
  public stagedReferenceProfileUrls$ = this.stagedReferenceProfileUrlsMapSubject.asObservable();

  constructor(private profileProviderService: ProfileProviderService) {
    this.initialize();
  }

  private initialize(): void {
    this.profileProviderService
      .getProfileIdMap()
      .pipe(
        map((profileIdMap) => {
          const initialMap = new Map<string, Map<string, string[]>>();
          profileIdMap.forEach((profile) => {
            const profileId = profile.getId();
            const elementIdMap = this.initializeElementIdMap(profile);
            initialMap.set(profileId, elementIdMap);
          });

          this.stagedReferenceProfileUrlsMapSubject.next(initialMap);
        })
      )
      .subscribe(() => console.log('init', this.stagedReferenceProfileUrlsMapSubject.value));
  }

  /**
   * Creates a map of element IDs to their associated URLs for a given profile.
   * @param profile - The profile to process.
   * @returns A map of element IDs to arrays of URLs.
   */
  private initializeElementIdMap(profile: DataSelectionProfile): Map<string, string[]> {
    const elementIdMap = new Map<string, string[]>();
    const fields = profile.getProfileFields();
    fields.getReferenceFields().forEach((field: ReferenceField) => {
      const elementId = field.getElementId();
      elementIdMap.set(elementId, []);
    });
    return elementIdMap;
  }

  public getStagedReferenceProfileUrlsMap(): Observable<Map<string, Map<string, string[]>>> {
    return this.stagedReferenceProfileUrlsMapSubject;
  }

  public addUrlToReferenceField(url: string, profileId: string, elementId: string): void {
    const currentMap = this.stagedReferenceProfileUrlsMapSubject.value;
    const profileMap = currentMap.get(profileId);
    const fieldUrls = profileMap.get(elementId);
    fieldUrls.push(url);
    profileMap.set(elementId, fieldUrls);
    this.stagedReferenceProfileUrlsMapSubject.next(new Map(currentMap));
  }

  public removeUrlFromReferenceField(url: string, profileId: string, elementId: string): void {
    const currentMap = this.stagedReferenceProfileUrlsMapSubject.value;

    // Ensure the profile exists in the map
    if (currentMap.has(profileId)) {
      const profileMap = currentMap.get(profileId);
      if (profileMap && profileMap.has(elementId)) {
        const fieldUrls = profileMap.get(elementId);

        // Remove the URL from the array of URLs
        const updatedUrls = fieldUrls.filter((existingUrl) => existingUrl !== url);

        if (updatedUrls.length !== fieldUrls.length) {
          profileMap.set(elementId, updatedUrls);
          this.stagedReferenceProfileUrlsMapSubject.next(new Map(currentMap)); // Notify subscribers
        }
      }
    }
  }

  // Optional: Clear all data (if you need this functionality)
  public clearAll(): void {
    this.stagedReferenceProfileUrlsMapSubject.next(new Map());
  }
}
