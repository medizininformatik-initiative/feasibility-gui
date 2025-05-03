import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { CreateDataSelectionProfileService } from './DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from '../modules/data-selection/services/DataSelectionProvider.service';
import { ElementIdMapService } from './ElementIdMap.service';
import { Injectable } from '@angular/core';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';
import { ProfileProviderService } from '../modules/data-selection/services/ProfileProvider.service';
import { StagedProfileService } from './StagedDataSelectionProfile.service';

@Injectable({
  providedIn: 'root',
})
export class PossibleReferencesService {
  /**
   * id vom profile --> elementId --> PossibleProfileReferenceData Array
   */
  private possibleReferencesMapSubject = new BehaviorSubject<
    Map<string, Map<string, PossibleProfileReferenceData[]>>
  >(new Map());
  private possibleReferencesMap$ = this.possibleReferencesMapSubject.asObservable();

  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private elementIdMapService: ElementIdMapService,
    private stagedProfileService: StagedProfileService,
    private profileProviderService: ProfileProviderService
  ) {}

  public initialize(profileId: string): Observable<void> {
    return this.stagedProfileService.getProfileObservable().pipe(
      switchMap((profile) => {
        const initialMap = new Map<string, Map<string, PossibleProfileReferenceData[]>>();
        const elementIdMap =
          this.elementIdMapService.createElementIdMapForPossibleReferencesNew(profile);
        initialMap.set(profileId, elementIdMap);
        this.updateStagePossibleProfileRefrencesMap(initialMap);
        return this.filterPossibleReferences(profile);
      })
    );
  }

  /**
   * Updates the staged reference profile URLs map.
   * @param updatedMap - The updated map to set.
   */
  public updateStagePossibleProfileRefrencesMap(
    updatedMap: Map<string, Map<string, PossibleProfileReferenceData[]>>
  ): void {
    this.possibleReferencesMapSubject.next(new Map(updatedMap));
  }

  public filterPossibleReferences(parentProfile: DataSelectionProfile): Observable<void> {
    return this.dataSelectionProviderService.getProfilesFromActiveDataSelection().pipe(
      take(1),
      map((dataSelectionProfiles) => {
        dataSelectionProfiles.forEach((profile) => {
          const profileId = profile.getId();
          this.profileProviderService.getProfileById(profileId);
          const currentMap = this.possibleReferencesMapSubject.value;
          const referencedFields = parentProfile.getProfileFields().getReferenceFields();
          const innerMap =
            currentMap.get(profileId) || new Map<string, PossibleProfileReferenceData[]>();
          const newInnerMap = new Map<string, PossibleProfileReferenceData[]>();
          innerMap.forEach((possibleReferenceData, elementId) => {
            const referencedProfileUrls = [
              ...(referencedFields
                .find((field) => field.getElementId() === elementId)
                ?.getReferencedProfileUrls() || []),
            ];
            const linkedIds = this.getLinkedProfilesIdsFromSelectedRefrenceFields(
              parentProfile,
              elementId
            );
            const existingProfiles = this.getExistingProfilesByUrls(
              referencedProfileUrls,
              profileId,
              dataSelectionProfiles
            );
            const possibleReferences = this.mapProfilesToPossibleReferences(
              existingProfiles,
              linkedIds
            );

            newInnerMap.set(elementId, possibleReferences);
          });

          const updatedMap = new Map(currentMap);
          updatedMap.set(profileId, newInnerMap);
          this.possibleReferencesMapSubject.next(updatedMap);
          return updatedMap;
        });
      })
    );
  }

  /**
   * Public getter for the possibleReferencesMap$ observable.
   * @returns An observable of the possible references map.
   */
  public getPossibleReferencesMap(): Observable<
    Map<string, Map<string, PossibleProfileReferenceData[]>>
  > {
    return this.possibleReferencesMapSubject.asObservable();
  }

  public getLinkedProfilesIdsFromSelectedRefrenceFields(
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
   * Retrieves existing profiles by matching URLs and excluding the current profile.
   * @param urls - The list of URLs to match.
   * @param profileId - The ID of the current profile to exclude.
   * @param profileMap - A map of profile IDs to profiles.
   * @returns A list of matching profiles.
   */
  private getExistingProfilesByUrls(
    urls: string[],
    profileId: string,
    profileMap: DataSelectionProfile[]
  ): DataSelectionProfile[] {
    return profileMap
      .filter((profile) => urls.includes(profile.getUrl()))
      .filter((profile) => profile.getId() !== profileId);
  }

  /**
   * Second use-case for exiting profiles
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
   * First use-case for newly selected profiles
   * Maps URLs to possible reference data objects.
   * @param urls - The URLs to map.
   * @returns A list of possible profile references.
   */
  private mapProfilesToReferences(
    profiles: DataSelectionProfile[]
  ): PossibleProfileReferenceData[] {
    return profiles.map((profile) => this.mapProfileToReference(profile, true));
  }

  public fetchProfilesAndMapToPossibleReferences(
    urls: string[],
    elementId: string,
    parentProfileId: string
  ): Observable<PossibleProfileReferenceData[]> {
    return this.createDataSelectionProfileService.fetchDataSelectionProfileData(urls).pipe(
      take(1),
      map((profiles: DataSelectionProfile[]) => {
        const possibleReferences = this.mapProfilesToReferences(profiles);
        const currentMap = this.possibleReferencesMapSubject.getValue();
        const outerMap =
          currentMap.get(parentProfileId) || new Map<string, PossibleProfileReferenceData[]>();
        const existingReferences = outerMap.get(elementId) || [];
        const updatedReferences = [...existingReferences, ...possibleReferences];
        const updatedOuterMap = new Map(outerMap);
        updatedOuterMap.set(elementId, updatedReferences);
        const updatedMap = new Map(currentMap);
        updatedMap.set(parentProfileId, updatedOuterMap);
        this.possibleReferencesMapSubject.next(updatedMap);

        return updatedReferences;
      })
    );
  }

  public clearPossibleReferencesMap(): void {
    this.possibleReferencesMapSubject.next(new Map());
  }
}
