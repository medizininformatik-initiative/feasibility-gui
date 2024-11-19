import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';

@Injectable({
  providedIn: 'root',
})
export class SelectedDataSelectionProfileService {
  private selectedProfiles = new BehaviorSubject<DataSelectionProfileTreeNode[]>([]);

  private profileIds = new Set<string>();

  /**
   * Gets the selected profiles as an observable.
   */
  public getSelectedProfiles(): Observable<DataSelectionProfileTreeNode[]> {
    return this.selectedProfiles.asObservable();
  }

  /**
   * Sets the selected profiles and updates the internal ID set.
   *
   * @param profiles The profiles to be set.
   */
  public setSelectedProfiles(profiles: DataSelectionProfileTreeNode[]): void {
    this.selectedProfiles.next(profiles);
    this.profileIds.clear();
    profiles.forEach((profile) => this.profileIds.add(profile.getUrl()));
  }

  /**
   * Adds a profile to the current selection if it is not already included.
   *
   * @param profile The profile to be added to the selection.
   */
  public addToSelection(profile: DataSelectionProfileTreeNode): void {
    const currentSelection = this.selectedProfiles.getValue();
    if (!this.profileIds.has(profile.getUrl())) {
      this.selectedProfiles.next([...currentSelection, profile]);
      this.profileIds.add(profile.getUrl());
    }
  }

  /**
   * Gets the IDs of all selected items.
   *
   * @returns An array of IDs.
   */
  public getSelectedIds(): string[] {
    return Array.from(this.profileIds);
  }

  /**
   * Removes a profile from the current selection.
   *
   * @param profile The profile to be removed from the selection.
   */
  public removeFromSelection(profile: DataSelectionProfileTreeNode): void {
    const currentSelection = this.selectedProfiles.getValue();
    const updatedSelection = currentSelection.filter((p) => p.getUrl() !== profile.getUrl());
    this.selectedProfiles.next(updatedSelection);
    this.profileIds.delete(profile.getUrl());
  }

  /**
   * Clears the current selection of all profiles.
   */
  public clearSelection(): void {
    this.selectedProfiles.next([]);
    this.profileIds.clear();
  }
}
