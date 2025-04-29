import { BehaviorSubject, map, Observable } from 'rxjs';
import { ElementIdMapService } from '../ElementIdMap.service';
import { Injectable } from '@angular/core';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Service to manage URLs associated with reference fields in profiles.
 * This service allows adding, removing, and clearing URLs for specific reference fields within profiles.
 */
export class StagedReferenceFieldProviderService {
  /**
   *  * A map of profileId -> (elementId -> array of URLs)
   *  * A profile id is unique in the UI. An element id is only unique within a profile.
   */
  private stagedReferenceProfileUrlsMapSubject = new BehaviorSubject<
    Map<string, Map<string, string[]>>
  >(new Map());
  public stagedReferenceProfileUrls$ = this.stagedReferenceProfileUrlsMapSubject.asObservable();

  /**
   *  * A map of profileId -> (elementId -> array of existing profile ids)
   *  * A profile id is unique in the UI. An element id is only unique within a profile.
   */
  private stagedPossibleProfileRefrencesMapSubject = new BehaviorSubject<
    Map<string, Map<string, Set<string>>>
  >(new Map());
  public stagedPossibleProfileRefrences$ =
    this.stagedPossibleProfileRefrencesMapSubject.asObservable();

  constructor(
    private elementIdMapService: ElementIdMapService,
    private profileProviderService: ProfileProviderService
  ) {}

  /**
   * Initializes the staged reference profile URLs map for a given profile ID.
   * @param profileId - The ID of the profile to initialize.
   */
  public initialize(profileId: string): void {
    const profile = this.profileProviderService.getProfileById(profileId);
    const initialMap = new Map<string, Map<string, string[]>>();
    const elementIdMap = this.elementIdMapService.createElementIdMap(profile);
    initialMap.set(profileId, elementIdMap);
    this.updateStagedReferenceProfileUrlsMap(initialMap);
    this.initializePossibleReferences(profileId);
  }

  private initializePossibleReferences(profileId: string) {
    const profile = this.profileProviderService.getProfileById(profileId);
    const initialMap = new Map<string, Map<string, Set<string>>>();
    const elementIdMap = this.elementIdMapService.createElementIdMapForPossibleReferences(profile);
    initialMap.set(profileId, elementIdMap);
    this.updateStagePossibleProfileRefrencesMap(initialMap);
  }

  /**
   * Retrieves the staged reference profile URLs map as an observable.
   * @returns An observable of the staged reference profile URLs map.
   */
  public getStagedReferenceProfileUrlsMap(): Observable<Map<string, Map<string, string[]>>> {
    return this.stagedReferenceProfileUrls$;
  }

  public getStagegdReferenceProfileUrlsMapValue(): Map<string, Map<string, string[]>> {
    return this.stagedReferenceProfileUrlsMapSubject.value;
  }

  /**
   * Adds a URL to a specific reference field in the staged reference profile URLs map.
   * @param url - The URL to add.
   * @param profileId - The ID of the profile containing the reference field.
   * @param elementId - The ID of the reference field.
   */
  public addUrlToReferenceField(url: string, profileId: string, elementId: string): void {
    const currentMap = this.stagedReferenceProfileUrlsMapSubject.value;
    const profileMap = this.getOrCreateProfileMap(currentMap, profileId);
    const fieldUrls = this.getOrCreateFieldUrls(profileMap, elementId);
    if (!fieldUrls.includes(url)) {
      fieldUrls.push(url);
      profileMap.set(elementId, fieldUrls);
      this.updateStagedReferenceProfileUrlsMap(currentMap);
    }
  }

  public addIdToReferenceField(id: string, profileId: string, elementId: string): void {
    const currentMap = this.stagedPossibleProfileRefrencesMapSubject.value;
    const profileMap = currentMap.get(profileId); // this.getOrCreateProfileMap(currentMap, profileId);
    const profileIdSet = profileMap.get(elementId); //this.getOrCreateFieldUrls(profileMap, elementId);
    profileIdSet.add(id);
    profileMap.set(elementId, profileIdSet);
    this.updateStagePossibleProfileRefrencesMap(currentMap);
  }

  /**
   * Removes a URL from a specific reference field in the staged reference profile URLs map.
   * @param url - The URL to remove.
   * @param profileId - The ID of the profile containing the reference field.
   * @param elementId - The ID of the reference field.
   */
  public removeUrlFromReferenceField(url: string, profileId: string, elementId: string): void {
    const currentMap = this.stagedReferenceProfileUrlsMapSubject.value;
    const profileMap = currentMap.get(profileId);

    if (profileMap) {
      const fieldUrls = profileMap.get(elementId) || [];
      const updatedUrls = fieldUrls.filter((existingUrl) => existingUrl !== url);

      if (updatedUrls.length !== fieldUrls.length) {
        profileMap.set(elementId, updatedUrls);
        this.updateStagedReferenceProfileUrlsMap(currentMap);
      }
    }
  }

  /**
   * Clears all staged reference profile URLs.
   */
  public clearAll(): void {
    this.updateStagedReferenceProfileUrlsMap(new Map());
  }

  /**
   * Retrieves or creates a profile map for a given profile ID.
   * @param currentMap - The current staged reference profile URLs map.
   * @param profileId - The ID of the profile.
   * @returns The profile map for the given profile ID.
   */
  private getOrCreateProfileMap(
    currentMap: Map<string, Map<string, string[]>>,
    profileId: string
  ): Map<string, string[]> {
    if (!currentMap.has(profileId)) {
      currentMap.set(profileId, new Map<string, string[]>());
    }
    return currentMap.get(profileId);
  }

  /**
   * Retrieves or creates a field URLs array for a given element ID.
   * @param profileMap - The profile map containing the reference field.
   * @param elementId - The ID of the reference field.
   * @returns The array of URLs for the given element ID.
   */
  private getOrCreateFieldUrls(profileMap: Map<string, string[]>, elementId: string): string[] {
    if (!profileMap.has(elementId)) {
      profileMap.set(elementId, []);
    }
    return profileMap.get(elementId);
  }

  /**
   * Updates the staged reference profile URLs map.
   * @param updatedMap - The updated map to set.
   */
  private updateStagedReferenceProfileUrlsMap(
    updatedMap: Map<string, Map<string, string[]>>
  ): void {
    this.stagedReferenceProfileUrlsMapSubject.next(new Map(updatedMap));
  }

  /**
   * Updates the staged reference profile URLs map.
   * @param updatedMap - The updated map to set.
   */
  private updateStagePossibleProfileRefrencesMap(
    updatedMap: Map<string, Map<string, Set<string>>>
  ): void {
    this.stagedPossibleProfileRefrencesMapSubject.next(new Map(updatedMap));
  }
}
