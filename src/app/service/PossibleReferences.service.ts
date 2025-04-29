import { combineLatest, map, Observable } from 'rxjs';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from '../model/DataSelection/Profile/Display';
import { Injectable } from '@angular/core';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { StagedReferenceFieldProviderService } from './Provider/StagedReferenceFieldProvider.service';
import { Translation } from '../model/DataSelection/Profile/Translation';

@Injectable({
  providedIn: 'root',
})
export class PossibleReferencesService {
  constructor(
    private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService,
    private profileProviderService: ProfileProviderService
  ) {}

  /**
   * Fetches possible references by combining staged references and existing references.
   * @param elementId - The ID of the reference field.
   * @param profileId - The ID of the profile.
   * @returns An observable of possible profile references.
   */
  public filterPossibleReferences(
    elementId: string,
    profileId: string,
    urls: string[]
  ): Observable<PossibleProfileReferenceData[]> {
    return combineLatest([
      this.stagedReferenceFieldProviderService.getStagedReferenceProfileUrlsMap(),
      this.profileProviderService.getProfileIdMap(),
    ]).pipe(
      map(([stagedReferenceMap, profileMap]) => {
        const stagedUrls = this.getStagedUrls(stagedReferenceMap, profileId, elementId);
        const linkedIds = this.getLinkedProfilesIdsFromSelectedRefrenceFields(
          profileMap.get(profileId),
          elementId
        );
        const existingProfiles = this.getExistingProfilesByUrls(urls, profileId, profileMap);
        return [
          ...this.mapProfilesToPossibleReferences(existingProfiles, linkedIds),
          ...this.mapUrlsToReferences(stagedUrls),
        ];
      })
    );
  }

  //profileid --> provider das prifl holen -> über alle selected profiles iterieren und das eine feld anhand elmentId
  //

  private getLinkedProfilesIdsFromSelectedRefrenceFields(
    parentProfile: DataSelectionProfile,
    elementId: string
  ): string[] {
    const foudnSelectedReferenceField = parentProfile
      .getProfileFields()
      .getSelectedReferenceFields()
      ?.find((field) => field.getElementId() === elementId);
    return foudnSelectedReferenceField?.getLinkedProfileIds() ?? [];
  }

  /**
   * Retrieves staged URLs for a specific profile and element ID.
   * @param stagedReferenceMap - The staged reference profile URLs map.
   * @param profileId - The ID of the profile.
   * @param elementId - The ID of the reference field.
   * @returns An array of staged URLs.
   */
  private getStagedUrls(
    stagedReferenceMap: Map<string, Map<string, string[]>>,
    profileId: string,
    elementId: string
  ): string[] {
    return stagedReferenceMap.get(profileId)?.get(elementId) ?? [];
  }

  /**
   * Retrieves existing profiles by matching URLs and excluding the current profile.
   * @param urls - The list of URLs to match.
   * @param profileId - The ID of the current profile to exclude.
   * @param profileMap - A map of profile IDs to profiles.
   * @returns A list of matching profiles.
   */
  private getExistingProfilesByUrls(
    urls: string[],
    profileId: string,
    profileMap: Map<string, DataSelectionProfile>
  ): DataSelectionProfile[] {
    return Array.from(profileMap.values())
      .filter((profile) => urls.includes(profile.getUrl()))
      .filter((profile) => profile.getId() !== profileId);
  }

  /**
   * Maps profiles to possible reference data objects.
   * @param profiles - The profiles to map.
   * @returns A list of possible profile references.
   */
  private mapProfilesToPossibleReferences(
    profiles: DataSelectionProfile[],
    linkedIds: string[]
  ): PossibleProfileReferenceData[] {
    return profiles.map((profile) => {
      let isSelectd = false;
      if (linkedIds.length > 0) {
        isSelectd = linkedIds.includes(profile.getId());
      }
      return this.mapProfileToReference(profile, isSelectd);
    });
  }

  /**
   * Maps a profile to a possible reference data object.
   * @param profile - The profile to map.
   * @returns A `PossibleProfileReferenceData` object.
   */
  private mapProfileToReference(
    profile: DataSelectionProfile,
    isSelectd: boolean
  ): PossibleProfileReferenceData {
    return {
      id: profile.getId(),
      label: profile.getLabel(),
      display: profile.getDisplay(),
      url: profile.getUrl(),
      isSelected: isSelectd,
    };
  }

  /**
   * Maps URLs to possible reference data objects.
   * @param urls - The URLs to map.
   * @returns A list of possible profile references.
   */
  private mapUrlsToReferences(urls: string[]): PossibleProfileReferenceData[] {
    return urls.map((url) => ({
      id: this.normalizeReferenceUrl(url),
      label: undefined,
      display: this.createDisplay(this.normalizeReferenceUrl(url)),
      url,
      isSelected: true,
    }));
  }

  /**
   * Normalizes a reference URL into a readable format.
   * @param url - The URL to normalize.
   * @returns A normalized string.
   */
  public normalizeReferenceUrl(url: string): string {
    const lastPart = url.split('/').pop() || '';
    return lastPart
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Creates a display object for a reference.
   * @param display - The display string.
   * @returns A `Display` object.
   */
  private createDisplay(display: string): Display {
    const translations = [
      new Translation('de-DE', display, []),
      new Translation('en-US', display, []),
    ];
    return new Display(translations, display, []);
  }
}
