import { AttributeGroupsData } from 'src/app/model/Interface/AttributeGroupsData';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { DataSelectionFilterType } from 'src/app/model/Utilities/DataSelectionFilterType';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { FilterData } from 'src/app/model/Interface/FilterData';
import { Injectable } from '@angular/core';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { v4 as uuidv4 } from 'uuid';
import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';

@Injectable({
  providedIn: 'root',
})
export class ProfileFilterTranslatorService {
  constructor(private readonly uITimeRestrictionFactoryService: UITimeRestrictionFactoryService) {}

  public createProfileFilters(
    externProfile: AttributeGroupsData,
    profile: DataSelectionProfile
  ): AbstractProfileFilter[] {
    const filters: AbstractProfileFilter[] = [];
    const tokenFilters = this.createTokenFilters(externProfile, profile);
    const dateFilters = this.createDateFilters(externProfile);
    filters.push(...tokenFilters);
    filters.push(...dateFilters);
    return filters;
  }

  private createTokenFilters(
    externProfile: AttributeGroupsData,
    profile: DataSelectionProfile
  ): ProfileTokenFilter[] {
    return (externProfile.filter ?? [])
      .filter((filterData: FilterData) => filterData.type === DataSelectionFilterType.TOKEN)
      .map((filterData) => this.createProfileTokenFilter(filterData, profile));
  }

  private createDateFilters(externProfile: AttributeGroupsData): ProfileTimeRestrictionFilter[] {
    return (externProfile.filter ?? [])
      .filter((filterData: FilterData) => filterData.type === DataSelectionFilterType.DATE)
      .map((filterData) => this.createProfileTimeRestrictionFilter(filterData));
  }

  private createProfileTokenFilter(
    externFilter: FilterData,
    profile: DataSelectionProfile
  ): ProfileTokenFilter {
    const codeFilter = profile
      .getFilters()
      .find((profileFilter) => profileFilter.getName() === externFilter.name) as ProfileTokenFilter;
    const concepts = externFilter.codes.map(
      (code) =>
        new Concept(
          new Display([], code.display),
          new TerminologyCode(code.code, code.display, code.system, code.version)
        )
    );

    return new ProfileTokenFilter(
      uuidv4(),
      externFilter.name,
      externFilter.type,
      codeFilter.getValueSetUrls(),
      concepts
    );
  }

  private createProfileTimeRestrictionFilter(
    externFilter: FilterData
  ): ProfileTimeRestrictionFilter {
    const timeRestriction =
      this.uITimeRestrictionFactoryService.createTimeRestrictionForDataSelection(externFilter);
    return new ProfileTimeRestrictionFilter(externFilter.name, externFilter.type, timeRestriction);
  }
}
