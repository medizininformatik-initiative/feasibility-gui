import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeDefinitionToAttributeFilterFactoryService } from '../AttributeDefinitionFactory/AttributeDefinitionToAttributeFilterFactory.service';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionMetadataService } from '../CriterionMetadata.service';
import { Injectable } from '@angular/core';
import { ValueDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/ValueDefnition';
import { ValueDefinitionToValueFilterFactoryService } from '../AttributeDefinitionFactory/ValueDefinitionToValueFilterFactory.service';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { CriteriaProfile } from '../../../../model/FeasibilityQuery/CriteriaProfileData';

@Injectable({
  providedIn: 'root',
})
export class CriterionBuilderHelperService {
  constructor(
    private attributeFilterFactoryService: AttributeDefinitionToAttributeFilterFactoryService,
    private valueFilterFactoryService: ValueDefinitionToValueFilterFactoryService,
    private criterionMetadataService: CriterionMetadataService
  ) {}

  public setBuilderWithCriteriaProfileData(profileData: CriteriaProfile): CriterionBuilder {
    const mandatoryFields = this.criterionMetadataService.createMandatoryFields(profileData);
    const builder = new CriterionBuilder(mandatoryFields);
    const valueFilter = this.addValueFilters(profileData.getValueDefinitions());
    const attributeFilter = this.addAttributeFilters(profileData.getAttributeDefinitions());

    if (profileData.getTimeRestrictionAllowed()) {
      builder.withTimeRestriction(builder.buildTimeRestriction());
    }
    builder.withValueFilters(valueFilter);
    builder.withAttributeFilters(attributeFilter);
    return builder;
  }

  /**
   * Adds attribute filters to the criterion builder.
   *
   * @param attributeDefinitions The attribute definitions to add as filters.
   * @param criterionBuilder The criterion builder to which attribute filters will be added.
   * @returns The modified CriterionBuilder.
   */
  private addAttributeFilters(
    attributeDefinitions: AttributeDefinitions[]
  ): AttributeFilter[] | [] {
    if (attributeDefinitions.length > 0) {
      return attributeDefinitions.map((attributeDefinition: AttributeDefinitions) =>
        this.attributeFilterFactoryService.createAttributeFilter(attributeDefinition)
      );
    }
  }

  /**
   * Adds value filters to the criterion builder.
   *
   * @param valueDefinitions The value definitions to add as filters.
   * @param criterionBuilder The criterion builder to which value filters will be added.
   * @returns The modified CriterionBuilder.
   */
  private addValueFilters(valueDefinitions: ValueDefinition[]): ValueFilter[] | [] {
    if (valueDefinitions.length > 0) {
      return valueDefinitions.map((valueDefinition) =>
        this.valueFilterFactoryService.createValueFilter(valueDefinition)
      );
    }
    return [];
  }
}
