import { AbstractAttributeGroupFilter } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/AbstractAttributeGroupFilter';
import { AbstractProfileFilter } from 'src/app/model/DataSelection/Profile/Filter/AbstractProfileFilter';
import { AttributeGroup } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup';
import { Attributes } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/Attributes/Attribute';
import { DataExtraction } from 'src/app/model/CRTDL/DataExtraction/DataExtraction';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { DateFilter } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/Filter/DateFilter';
import { Injectable } from '@angular/core';
import { ProfileCodeFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { TerminologyCodeTranslator } from '../Shared/TerminologyCodeTranslator.service';
import { TimeRestrictionTranslationService } from '../Shared/TimeRestrictionTranslation.service';
import { TokenFilter } from 'src/app/model/CRTDL/DataExtraction/AttributeGrooups/AttributeGroup/Filter/TokenFilter ';

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
      .getDataSelection()
      .map((profile) => this.translateAttributeGroups(profile));
    return attribuetGroups.length > 0 ? new DataExtraction(attribuetGroups) : undefined;
  }

  private translateAttributeGroups(profile: DataSelectionProfileProfile): AttributeGroup {
    const attributes = this.translateAttributes(profile.getFields());
    const filters = this.translateFilters(profile.getFilters());
    return new AttributeGroup(profile.getUrl(), attributes, filters);
  }

  private translateAttributes(fields: DataSelectionProfileProfileNode[]): Attributes[] {
    const attributes = [];
    fields.forEach((field) => {
      if (field.getIsSelected()) {
        attributes.push(this.translateAttribute(field));
      }
      if (field.getChildren().length > 0) {
        this.translateAttributes(field.getChildren());
      }
    });
    return attributes.length > 0 ? attributes : undefined;
  }

  private translateAttribute(field: DataSelectionProfileProfileNode): Attributes {
    return new Attributes(field.getId(), field.getIsRequired());
  }

  private translateFilters(
    filters: AbstractProfileFilter[]
  ): AbstractAttributeGroupFilter[] | undefined {
    const abstractProfileFilters: AbstractAttributeGroupFilter[] = [];

    filters.forEach((filter) => {
      console.log(filter);
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
      case DataSelectionFilterTypes.TIMERESTRICTION:
        return this.translateDateFilter(filter as ProfileTimeRestrictionFilter);
      case DataSelectionFilterTypes.CODE:
        return this.translateTokenFilter(filter as ProfileCodeFilter);
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
          time.beforeDate,
          time.afterDate
        )
      : undefined;
  }

  private translateTokenFilter(profileTokenFilter: ProfileCodeFilter): TokenFilter | undefined {
    const selectedTokens = profileTokenFilter.getSelectedTokens();
    if (selectedTokens.length > 0) {
      const terminologyCodes = this.terminologyCodeTranslator.translateTermCodes(selectedTokens);
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
