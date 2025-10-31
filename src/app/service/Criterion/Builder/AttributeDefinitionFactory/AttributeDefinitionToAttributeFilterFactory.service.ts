import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeDefinitionToAttributeFilterBuilderHelperService } from './AttributeDefinitionToAttributeFilterBuilderHelper.service';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { Injectable } from '@angular/core';
import { ReferenceFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AttributeDefinitionToAttributeFilterFactoryService {
  constructor(
    private factoryHelperService: AttributeDefinitionToAttributeFilterBuilderHelperService
  ) {}

  /**
   * Creates an AttributeFilter from an AttributeDefinitions using AttributeFiltersBuilder.
   *
   * @param attributeDefinition The attribute definition to create the filter from.
   * @returns AttributeFilter The constructed attribute filter.
   */
  public createAttributeFilter(attributeDefinition: AttributeDefinitions): AttributeFilter {
    const builder = this.factoryHelperService.initializeFilterBuilder(attributeDefinition);
    this.factoryHelperService.addFiltersToBuilder(attributeDefinition, builder);

    if (attributeDefinition.getType() === FilterTypes.REFERENCE) {
      builder.withReferenceFilter(this.referenceFilterInstance(attributeDefinition));
    }
    builder.withAttributeCode(attributeDefinition.getAttributeCode());
    return builder.buildAttributeFilter();
  }

  private referenceFilterInstance(attributeDefinition): ReferenceFilter {
    return new ReferenceFilter(uuidv4(), attributeDefinition.getReferenceCriteriaSet(), []);
  }
}
