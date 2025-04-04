import { AbstractAttributeGroupFilter } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/AbstractAttributeGroupFilter';
import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { AttributeGroup } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup';
import { Attributes } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/Attributes/Attribute';
import { DataExtraction } from 'src/app/model/CRTDL/DataExtraction/DataExtraction';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { DateFilter } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/Filter/DateFilter';
import { Injectable } from '@angular/core';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { TerminologyCodeTranslator } from '../Shared/TerminologyCodeTranslator.service';
import { TimeRestrictionTranslationService } from '../Shared/TimeRestrictionTranslation.service';
import { TokenFilter } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/Filter/TokenFilter ';
import { SelectedField } from 'src/app/model/DataSelection/Profile/Fields/SelectedField';

@Injectable({
  providedIn: 'root',
})
export class DataSelection2DataExtraction {
  constructor(
    private timeRestrictionTranslation: TimeRestrictionTranslationService,
    private terminologyCodeTranslator: TerminologyCodeTranslator
  ) {}

  public translateToDataExtraction(dataSelection: DataSelection): DataExtraction {
    const attribuetGroups = dataSelection
      .getProfiles()
      .map((profile) => this.translateAttributeGroups(profile));
    return attribuetGroups.length > 0 ? new DataExtraction(attribuetGroups) : undefined;
  }

  private translateAttributeGroups(profile: DataSelectionProfile): AttributeGroup {
    const attributes = this.translateSelectedFields(profile.getSelectedFields());
    const filters = this.translateFilters(profile.getFilters());
    return new AttributeGroup(
      profile.getUrl(),
      attributes,
      filters,
      profile.getReference().getIsReferenceSet() && profile.getReference().getIncludeReferenceOnly()
    );
  }

  private translateSelectedFields(selectedFields: SelectedField[]): Attributes[] | undefined {
    const attributes: Attributes[] = selectedFields.map((field) => this.translateAttributes(field));
    return attributes.length > 0 ? attributes : undefined;
  }

  private translateAttributes(field: SelectedField): Attributes {
    const linkedGroups =
      field.getLinkedProfiles().length > 0 ? field.getLinkedProfiles() : undefined;
    return new Attributes(field.getElementId(), field.getMustHave(), linkedGroups);
  }

  private translateFilters(
    filters: AbstractProfileFilter[]
  ): AbstractAttributeGroupFilter[] | undefined {
    const abstractProfileFilters: AbstractAttributeGroupFilter[] = [];

    filters.forEach((filter) => {
      const translatedFilter = this.getTranslatedFilter(filter);
      if (translatedFilter) {
        abstractProfileFilters.push(translatedFilter);
      }
    });

    return abstractProfileFilters.length > 0 ? abstractProfileFilters : undefined;
  }

  private getTranslatedFilter(
    filter: AbstractProfileFilter
  ): AbstractAttributeGroupFilter | undefined {
    switch (filter.getUiType()) {
      case DataSelectionUIType.TIMERESTRICTION:
        return this.translateDateFilter(filter as ProfileTimeRestrictionFilter);
      case DataSelectionUIType.CODE:
        return this.translateTokenFilter(filter as ProfileTokenFilter);
      default:
        return undefined;
    }
  }

  private translateDateFilter(
    profileDateFilter: ProfileTimeRestrictionFilter
  ): DateFilter | undefined {
    const time = this.timeRestrictionTranslation.translateTimeRestrictionToStructuredQuery(
      profileDateFilter.getTimeRestriction()
    );
    return time
      ? new DateFilter(
          profileDateFilter.getName(),
          profileDateFilter.getType(),
          time.getAfterDate(),
          time.getBeforeDate()
        )
      : undefined;
  }

  private translateTokenFilter(profileTokenFilter: ProfileTokenFilter): TokenFilter | undefined {
    const selectedTokens = profileTokenFilter.getSelectedTokens();
    if (selectedTokens.length > 0) {
      const terminologyCodes = this.terminologyCodeTranslator.translateTermCodes(
        selectedTokens.map((token) => token.getTerminologyCode())
      );
      return new TokenFilter(
        profileTokenFilter.getName(),
        profileTokenFilter.getType(),
        terminologyCodes
      );
    } else {
      return undefined;
    }
  }
}
