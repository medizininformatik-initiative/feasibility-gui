import { ActiveDataSelectionService } from './Provider/ActiveDataSelection.service';
import { CreateDataSelectionProfileService } from './DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from '../model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';
import { Injectable } from '@angular/core';
import { concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { SelectedReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { StagedReferenceFieldProviderService } from './Provider/StagedReferenceFieldProvider.service';
import { ReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { ElementIdMapService } from './ElementIdMap.service';

interface ElementUrlEntry {
  elementId: string
  url: string
}

@Injectable({
  providedIn: 'root',
})
export class CreateSelectedReferenceService {
  constructor(
    private activeDataSelectionService: ActiveDataSelectionService,
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private elementIdMapService: ElementIdMapService,
    private profileProviderService: ProfileProviderService,
    private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService
  ) {}

  /**
   * Fetches selected reference fields by processing staged references.
   */
  public getSelectedReferenceFields(
    profile: DataSelectionProfile
  ): Observable<SelectedReferenceField[]> {
    const referenceFields = profile.getProfileFields().getReferenceFields();
    return this.processStagedReferences(profile.getId()).pipe(
      concatMap((flattened) => this.fetchProfilesAndMapUrls(flattened)),
      map(({ flattened, urlToProfileId }) => {
        const selectedReferences = this.createSelectedReferenceFieldInstances(
          referenceFields,
          flattened,
          urlToProfileId
        );
        return selectedReferences;
      })
    );
  }

  /**
   * Processes staged reference URLs and returns flattened element-URL entries.
   */
  public processStagedReferences(profileId: string): Observable<ElementUrlEntry[]> {
    return this.stagedReferenceFieldProviderService.getStagedReferenceProfileUrlsMap().pipe(
      filter((profileMap) => profileMap.has(profileId)),
      map((profileMap) => this.elementIdMapService.flattenUrls(profileMap.get(profileId)))
    );
  }

  /**
   * Fetches profiles for the given URLs and maps them to their IDs.
   */
  private fetchProfilesAndMapUrls(
    flattened: ElementUrlEntry[]
  ): Observable<{ flattened: ElementUrlEntry[]; urlToProfileId: Map<string, string> }> {
    const uniqueUrls = this.getUniqueUrls(flattened);
    return this.createDataSelectionProfileService.fetchDataSelectionProfileData(uniqueUrls).pipe(
      map((profiles) => ({
        flattened,
        urlToProfileId: this.mapUrlsToProfileIds(profiles),
      }))
    );
  }

  /**
   * Creates selected reference field instances by mapping reference fields to profile IDs.
   */
  private createSelectedReferenceFieldInstances(
    referenceFields: ReferenceField[],
    flattened: ElementUrlEntry[],
    urlToProfileId: Map<string, string>
  ): SelectedReferenceField[] {
    return referenceFields
      .map((field) => {
        const profileIds = this.getProfileIdsForElement(
          field.getElementId(),
          flattened,
          urlToProfileId
        );
        if (profileIds.length === 0) {
          return null;
        }
        return new SelectedReferenceField(field, profileIds, false);
      })
      .filter((field): field is SelectedReferenceField => field !== null);
  }

  /**
   * Retrieves profile IDs for a given element ID.
   */
  private getProfileIdsForElement(
    elementId: string,
    flattened: ElementUrlEntry[],
    urlToProfileId: Map<string, string>
  ): string[] {
    return flattened
      .filter((entry) => entry.elementId === elementId)
      .map((entry) => urlToProfileId.get(entry.url))
      .filter((id): id is string => !!id);
  }

  /**
   * Extracts unique URLs from the flattened element-URL entries.
   */
  private getUniqueUrls(flattened: ElementUrlEntry[]): string[] {
    return Array.from(new Set(flattened.map((entry) => entry.url)));
  }

  /**
   * Maps URLs to profile IDs and updates the profile provider.
   */
  private mapUrlsToProfileIds(profiles: DataSelectionProfile[]): Map<string, string> {
    const urlToProfileIdMap = new Map<string, string>();
    profiles.forEach((profile) => {
      urlToProfileIdMap.set(profile.getUrl(), profile.getId());
    });
    this.updateActiveDataSelectionProfiles(profiles);
    return urlToProfileIdMap;
  }

  /**
   * Updates the active data selection with the fetched profiles.
   */
  private updateActiveDataSelectionProfiles(profiles: DataSelectionProfile[]): void {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
    profiles.forEach((profile) => {
      this.profileProviderService.setProfileById(profile.getId(), profile);
      this.dataSelectionProviderService.setProfileInDataSelection(dataSelectionId, profile);
    });
  }
}
