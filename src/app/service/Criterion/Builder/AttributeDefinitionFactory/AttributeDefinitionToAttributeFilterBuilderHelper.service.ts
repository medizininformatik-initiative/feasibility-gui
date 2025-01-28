import { AbstractAttributeDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/AbstractAttributeDefinition';
import { AttributeFiltersBuilder } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFiltersBuilder';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { FilterTypesService } from 'src/app/service/FilterTypes.service';
import { Injectable } from '@angular/core';
import { QuantityNotSet } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityNotSet';
import { v4 as uuidv4 } from 'uuid';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';

@Injectable({
  providedIn: 'root',
})
export class AttributeDefinitionToAttributeFilterBuilderHelperService {
  constructor(private filterTypesService: FilterTypesService) {}

  private emptyDisplayData = {
    original: '',
    translations: [
      {
        language: 'de-DE',
        value: undefined,
      },
      {
        language: 'en-US',
        value: undefined,
      },
    ],
  };
  /**
   * Initializes the AttributeFiltersBuilder with common properties from the value definition.
   *
   * @param valueDefinition The value definition to initialize the builder from.
   * @returns The initialized AttributeFiltersBuilder.
   */
  public initializeFilterBuilder(
    abstractAttributeDefinition: AbstractAttributeDefinition
  ): AttributeFiltersBuilder {
    console.log(abstractAttributeDefinition);
    const builder = new AttributeFiltersBuilder(
      this.instantiateDisplayData(abstractAttributeDefinition.getDisplay()),
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
      case FilterTypes.QUANTITY:
        this.addQuantityFilter(abstractAttributeDefinition, builder);
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
        abstractAttributeDefinition.getAllowedUnits(),
        undefined,
        abstractAttributeDefinition.getPrecision()
      )
    );
  }

  public instantiateEmptyDisplayData(displayData: string): DisplayData {
    return new DisplayData(
      this.emptyDisplayData.translations.map(
        (translation) => new Translation(translation.language, translation.value)
      ),
      displayData
    );
  }

  instantiateDisplayData(displayData: any): DisplayData {
    return new DisplayData(
      displayData.translations.map(
        (translation) => new Translation(translation.language, translation.value)
      ),
      displayData.original
    );
  }
}
