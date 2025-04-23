import { Injectable } from '@angular/core';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';

interface ElementUrlEntry {
  elementId: string
  url: string
}

@Injectable({
  providedIn: 'root',
})
export class ElementIdMapService {
  /**
   * Creates a map of element IDs to their associated URLs for a given profile.
   * @param profile - The profile to process.
   * @returns A map of element IDs to arrays of URLs.
   */
  public createElementIdMap(profile: DataSelectionProfile): Map<string, string[]> {
    const elementIdMap = new Map<string, string[]>();
    const fields = profile.getProfileFields();

    fields.getReferenceFields().forEach((field: ReferenceField) => {
      const elementId = field.getElementId();
      elementIdMap.set(elementId, []);
    });

    return elementIdMap;
  }

  /**
   * Retrieves or creates a profile map for a given profile ID.
   * @param currentMap - The current staged reference profile URLs map.
   * @param profileId - The ID of the profile.
   * @returns The profile map for the given profile ID.
   */
  public getOrCreateProfileMap(
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
  public getOrCreateFieldUrls(profileMap: Map<string, string[]>, elementId: string): string[] {
    if (!profileMap.has(elementId)) {
      profileMap.set(elementId, []);
    }
    return profileMap.get(elementId);
  }

  /**
   * Converts the nested map into a flat element-URL list.
   * @param elementIdMap - A map of element IDs to arrays of URLs.
   * @returns A flat list of element-URL entries.
   */
  public flattenUrls(elementIdMap: Map<string, string[]> | undefined): ElementUrlEntry[] {
    if (!elementIdMap) {return [];}
    const flattened: ElementUrlEntry[] = [];

    elementIdMap.forEach((urls, elementId) => {
      urls.forEach((url) => {
        flattened.push({ elementId, url });
      });
    });

    return flattened;
  }
}
