import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeDefinitionToAttributeFilterFactoryService } from '../AttributeDefinitionFactory/AttributeDefinitionToAttributeFilterFactory.service';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { Injectable } from '@angular/core';
import { ValueDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/ValueDefnition';
import { ValueDefinitionToValueFilterFactoryService } from '../AttributeDefinitionFactory/ValueDefinitionToValueFilterFactory.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionBuilderHelperService {
  constructor(
    private attributeFilterFactoryService: AttributeDefinitionToAttributeFilterFactoryService,
    private valueFilterFactoryService: ValueDefinitionToValueFilterFactoryService
  ) {}

  /**
   * Adds attribute filters to the criterion builder.
   *
   * @param attributeDefinitions The attribute definitions to add as filters.
   * @param criterionBuilder The criterion builder to which attribute filters will be added.
   * @returns The modified CriterionBuilder.
   */
  public addAttributeFilters(
    attributeDefinitions: AttributeDefinitions[],
    criterionBuilder: CriterionBuilder
  ): CriterionBuilder {
    if (attributeDefinitions.length > 0) {
      const attributeFilters = attributeDefinitions.map((attributeDefinition) =>
        this.attributeFilterFactoryService.createAttributeFilter(attributeDefinition)
      );
      criterionBuilder.withAttributeFilters(attributeFilters);
    }
    return criterionBuilder;
  }

  /**
   * Adds value filters to the criterion builder.
   *
   * @param valueDefinitions The value definitions to add as filters.
   * @param criterionBuilder The criterion builder to which value filters will be added.
   * @returns The modified CriterionBuilder.
   */
  public addValueFilters(
    valueDefinitions: ValueDefinition[],
    criterionBuilder: CriterionBuilder
  ): CriterionBuilder {
    if (valueDefinitions.length > 0) {
      const valueFilters = valueDefinitions.map((valueDefinition) =>
        this.valueFilterFactoryService.createValueFilter(valueDefinition)
      );
      criterionBuilder.withValueFilters(valueFilters);
    }
    return criterionBuilder;
  }
}
