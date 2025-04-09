import { AbstractTimeRestriction } from '../model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { DataSelectionProfile } from '../model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';
import { ProfileTimeRestrictionFilter } from '../model/DataSelection/Profile/Filter/ProfileDateFilter';
import { Concept } from '../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { ProfileTokenFilter } from '../model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { CloneTimeRestriction } from '../model/Utilities/CriterionCloner/TimeRestriction/CloneTimeRestriction';
import { DataSelectionCloner } from '../model/Utilities/DataSelecionCloner/DataSelectionCloner';
import { AbstractProfileFilter } from '../model/DataSelection/Profile/Filter/AbstractProfileFilter';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor() {}

  /**
   * Updates the time restriction filter in the given profile.
   * @param profile The profile to update.
   * @param timeRestriction The new time restriction to apply.
   */
  public updateTimeRestriction(
    profile: DataSelectionProfile,
    timeRestriction: AbstractTimeRestriction,
    filterName: string
  ): void {
    const index = this.getTimeRestrictionFilter(profile).findIndex(
      (filter) => filter.getName() === filterName
    );
    if (index !== -1) {
      profile.getFilters()[index] = this.createProfileTimeRestriction(
        profile.getFilters()[index] as ProfileTimeRestrictionFilter,
        timeRestriction
      );
    }
  }

  /**
   * Finds the index of the time restriction filter in the profile.
   * @param profile The profile to search.
   * @returns The index of the time restriction filter, or -1 if not found.
   */
  public getTimeRestrictionFilterIndex(profile: DataSelectionProfile): number {
    return profile.getFilters().findIndex((filter) => filter.getType() === 'date');
  }

  public getTimeRestrictionFilter(profile: DataSelectionProfile): AbstractProfileFilter[] {
    return profile.getFilters().filter((filter) => filter.getType() === 'date');
  }
  /**
   * Creates a new ProfileTimeRestrictionFilter with the given time restriction.
   * @param filter The existing filter to update.
   * @param timeRestriction The new time restriction to apply.
   * @returns A new ProfileTimeRestrictionFilter instance.
   */
  private createProfileTimeRestriction(
    filter: ProfileTimeRestrictionFilter,
    timeRestriction: AbstractTimeRestriction
  ): ProfileTimeRestrictionFilter {
    CloneTimeRestriction.deepCopyTimeRestriction(timeRestriction);
    return new ProfileTimeRestrictionFilter(
      filter.getName(),
      filter.getType(),
      CloneTimeRestriction.deepCopyTimeRestriction(timeRestriction)
    );
  }

  public getProfileTokenFilterIndex(profile: DataSelectionProfile): number {
    return profile.getFilters().findIndex((filter) => filter.getType() === 'token');
  }
  public getProfileTokenFilter(profile: DataSelectionProfile): AbstractProfileFilter[] {
    return profile.getFilters().filter((filter) => filter.getType() === 'token');
  }
  public updateProfileTokenFilter(profile: DataSelectionProfile, tokenFilter: Concept[]): void {
    const index = this.getProfileTokenFilterIndex(profile);
    if (index !== -1) {
      const filter = profile.getFilters()[index] as ProfileTokenFilter;
      profile.getFilters()[index] = this.createProfileTokenFilter(filter, tokenFilter);
    }
  }
  private createProfileTokenFilter(
    filter: ProfileTokenFilter,
    tokenFilter: Concept[]
  ): ProfileTokenFilter {
    return new ProfileTokenFilter(
      filter.getId(),
      filter.getName(),
      filter.getType(),
      filter.getValueSetUrls(),
      tokenFilter
    );
  }

  public createNewProfileInstance(profile: DataSelectionProfile): DataSelectionProfile {
    return DataSelectionCloner.deepCopyProfile(profile);
  }
}
