import { AttributeDefinitions } from 'src/app/model/AttributeDefinitions';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AttributeFiltersBuilder } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFiltersBuilder';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { Injectable } from '@angular/core';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

@Injectable({
  providedIn: 'root',
})
export class AttributeDefinitionProcessorService {
  /**
   * Processes the attribute definitions in CriteriaProfileData and returns the AttributeFilter.
   *
   * @param criteriaProfileData The criteria profile data containing the attribute definitions.
   * @returns AttributeFilter[] The array of processed attribute filters.
   */
  public processAttributeFilters(criteriaProfileData: CriteriaProfileData): AttributeFilter[] {
    const attributeFilters: AttributeFilter[] = [];

    criteriaProfileData.getAttributeDefinitions().forEach((attributeDefinition) => {
      if (!attributeDefinition.getValueDefinition()) {
        const filter = this.createAttributeFilter(attributeDefinition);
        if (filter) {
          attributeFilters.push(filter);
        }
      }
    });

    return attributeFilters;
  }

  /**
   * Processes the value definitions in CriteriaProfileData and returns the ValueFilter.
   *
   * @param criteriaProfileData The criteria profile data containing the value definitions.
   * @returns ValueFilter[] The array of processed value filters.
   */
  public processValueFilters(criteriaProfileData: CriteriaProfileData): ValueFilter[] {
    const valueFilters: ValueFilter[] = [];

    criteriaProfileData.getAttributeDefinitions().forEach((attributeDefinition) => {
      if (attributeDefinition.getValueDefinition()) {
        const filter = this.createValueFilter(attributeDefinition);
        if (filter) {
          valueFilters.push(filter);
        }
      }
    });
    return valueFilters;
  }

  /**
   * Creates an AttributeFilter from an AttributeDefinition using AttributeFiltersBuilder.
   *
   * @param attributeDefinition The attribute definition to create the filter from.
   * @returns AttributeFilter The constructed attribute filter.
   */
  private createAttributeFilter(attributeDefinition: AttributeDefinitions): AttributeFilter | null {
    const builder = new AttributeFiltersBuilder(
      attributeDefinition.getName(),
      attributeDefinition.getOptional(),
      attributeDefinition.getType()
    );

    if (attributeDefinition.getAttributeCode()) {
      builder.withAttributeCode(attributeDefinition.getAttributeCode());
    }
    return builder.buildAttributeFilter();
  }

  /**
   * Creates a ValueFilter from an AttributeDefinition using AttributeFiltersBuilder.
   *
   * @param attributeDefinition The attribute definition to create the filter from.
   * @returns ValueFilter The constructed value filter.
   */
  private createValueFilter(attributeDefinition: AttributeDefinitions): ValueFilter | null {
    const builder = new AttributeFiltersBuilder(
      attributeDefinition.getName(),
      attributeDefinition.getOptional(),
      attributeDefinition.getType()
    );
    return builder.buildValueFilter();
  }
}
