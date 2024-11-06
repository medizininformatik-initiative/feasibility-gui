import { AbstractAttributeDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/AbstractAttributeDefinition';
import { AttributeFiltersBuilder } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFiltersBuilder';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { FilterTypesService } from 'src/app/service/FilterTypes.service';
import { Injectable } from '@angular/core';
import { QuantityNotSet } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityNotSet';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AttributeDefinitionToAttributeFilterBuilderHelperService {
  constructor(private filterTypesService: FilterTypesService) {}

  /**
   * Initializes the AttributeFiltersBuilder with common properties from the value definition.
   *
   * @param valueDefinition The value definition to initialize the builder from.
   * @returns The initialized AttributeFiltersBuilder.
   */
  public initializeFilterBuilder(
    abstractAttributeDefinition: AbstractAttributeDefinition
  ): AttributeFiltersBuilder {
    const builder = new AttributeFiltersBuilder(
      abstractAttributeDefinition.getName(),
      abstractAttributeDefinition.getOptional(),
      abstractAttributeDefinition.getType()
    );
    return builder;
  }

  /**
   * Adds the appropriate filters to the builder based on the attribute definition.
   *
   * @param attributeDefinition The attribute definition to convert.
   * @param builder The builder to modify.
   * @returns The modified AttributeFiltersBuilder.
   */
  public addFiltersToBuilder(
    abstractAttributeDefinition: AbstractAttributeDefinition,
    builder: AttributeFiltersBuilder
  ): AttributeFiltersBuilder {
    switch (abstractAttributeDefinition.getType()) {
      case FilterTypes.CONCEPT:
        this.addConceptFilter(abstractAttributeDefinition, builder);
        break;
      default:
        if (this.filterTypesService.isQuantity(abstractAttributeDefinition.getType())) {
          this.addQuantityFilter(abstractAttributeDefinition, builder);
        }
        break;
    }
    return builder;
  }

  private addConceptFilter(
    abstractAttributeDefinition: AbstractAttributeDefinition,
    builder: AttributeFiltersBuilder
  ): void {
    builder.withConcept(
      new ConceptFilter(uuidv4(), [abstractAttributeDefinition.getReferencedValueSet()], [])
    );
  }

  private addQuantityFilter(
    abstractAttributeDefinition: AbstractAttributeDefinition,
    builder: AttributeFiltersBuilder
  ): void {
    builder.withQuantity(
      new QuantityNotSet(
        undefined,
        abstractAttributeDefinition.getAllowedUnits(),
        abstractAttributeDefinition.getPrecision()
      )
    );
  }
}
