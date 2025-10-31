import { AttributeDefinitionData } from 'src/app/model/Interface/AttributeDefinitionData';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AttributeFilterData } from 'src/app/model/Interface/AttributeFilterData';
import { AttributeFiltersBuilder } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFiltersBuilder';
import { ConceptFilterTranslatorService } from './ConceptFilterTranslator.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { Injectable } from '@angular/core';
import { QuantityFilterTranslatorService } from './QuantityFilterTranslator.service';
import { ReferenceFilterTranslatorService } from './ReferenceFilterTranslator.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { TerminologyCodeBaseData } from 'src/app/model/Interface/TerminologyBaseData';
import { ValueDefinitionData } from 'src/app/model/Interface/ValueDefinition';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { ValueFilterData } from 'src/app/model/Interface/ValueFilterData';

@Injectable({
  providedIn: 'root',
})
export class AttributeFilterTranslatorService {
  constructor(
    private quantityFilterTranslatorService: QuantityFilterTranslatorService,
    private conceptFilterTranslatorService: ConceptFilterTranslatorService,
    private referenceFilterTranslatorService: ReferenceFilterTranslatorService
  ) {}

  /**
   * Translates the value filters from the structured query format to the internal format.
   * @param uiProfile
   * @param structuredQueryValueFilters
   * @returns
   */
  public translateValueFilters(
    valueDefinitionData: ValueDefinitionData,
    structuredQueryValueFilters: ValueFilterData
  ): ValueFilter {
    const attributeFilterBuilder = this.applyFilter(
      structuredQueryValueFilters,
      valueDefinitionData
    );
    return attributeFilterBuilder.buildValueFilter();
  }

  /**
   * Translates a list of attribute filters from the structured query format to the internal format.
   * @param uiProfile
   * @param structuredQueryAttributeFilters
   * @param parentId
   * @returns
   */
  public translateAttributeFilters(
    attributeDefinitionData: AttributeDefinitionData[],
    structuredQueryAttributeFilters: AttributeFilterData[],
    parentId: string
  ): AttributeFilter[] {
    return structuredQueryAttributeFilters
      .map((attributeFilter: AttributeFilterData) =>
        this.translateAttributeFilter(attributeDefinitionData, attributeFilter, parentId)
      )
      .filter((filter: AttributeFilter): filter is AttributeFilter => !!filter);
  }

  /**
   * Translates a single attribute filter from the structured query format to the internal format.
   * @param uiProfile
   * @param attributeFilterData
   * @param parentId
   * @returns
   */
  private translateAttributeFilter(
    attributeDefinitionData: AttributeDefinitionData[],
    attributeFilterData: AttributeFilterData,
    parentId: string
  ): AttributeFilter {
    const foundAttributeDefinition: AttributeDefinitionData | undefined =
      this.findAttributeFilterInProfile(attributeDefinitionData, attributeFilterData.attributeCode);

    if (!foundAttributeDefinition) {
      return;
    }
    const attributeFilterBuilder = this.applyFilter(
      attributeFilterData,
      foundAttributeDefinition,
      parentId
    );
    attributeFilterBuilder.withAttributeCode(
      TerminologyCode.fromJson(foundAttributeDefinition.attributeCode)
    );
    return attributeFilterBuilder.buildAttributeFilter();
  }

  /**
   * Applies the appropriate filter translation based on the filter type for Attribute Filters and Value Filters.
   * @param attributeFilterBuilder
   * @param attributeFilterData
   * @param parentId - The id of the parent criterion, used for reference filters.
   * @param attributeDefinitionData
   * @returns
   */
  private applyFilter(
    attributeFilterData: AttributeFilterData | ValueFilterData,
    attributeDefinitionData: AttributeDefinitionData | ValueDefinitionData,
    parentId?: string
  ): AttributeFiltersBuilder {
    const builder = this.createBuilderInstance(attributeDefinitionData);
    const type: FilterTypes = attributeDefinitionData.type;
    if (type === FilterTypes.CONCEPT) {
      const conceptFilter = this.conceptFilterTranslatorService.translate(
        attributeDefinitionData.referencedValueSet,
        attributeFilterData.selectedConcepts
      );
      return builder.withConceptFilter(conceptFilter);
    }
    if (type === FilterTypes.REFERENCE) {
      const referencedCriteriaSet: string[] = (attributeDefinitionData as AttributeDefinitionData)
        .referencedCriteriaSet;
      const attributeFilter = attributeFilterData as AttributeFilterData;
      const referenceFilter = this.referenceFilterTranslatorService.translate(
        parentId,
        attributeFilter.criteria,
        referencedCriteriaSet
      );
      return builder.withReferenceFilter(referenceFilter);
    }
    if (type === FilterTypes.QUANTITY) {
      const quantityFilter = this.quantityFilterTranslatorService.translate(
        attributeDefinitionData,
        attributeFilterData
      );
      return builder.withQuantityFilter(quantityFilter);
    }
  }

  /**
   * Creates an instance of the AttributeFiltersBuilder.
   * @param attributeDefinition
   * @returns
   */
  private createBuilderInstance(
    attributeDefinition: AttributeDefinitionData | ValueDefinitionData
  ): AttributeFiltersBuilder {
    return new AttributeFiltersBuilder(
      Display.fromJson(attributeDefinition.display),
      attributeDefinition.optional,
      attributeDefinition.type
    );
  }

  /**
   * Finds an attribute filter definition in the UI profile.
   * @param attributeDefinitions
   * @param attributeFilter
   * @returns
   */
  public findAttributeFilterInProfile(
    attributeDefinitions: AttributeDefinitionData[],
    attributeCode: TerminologyCodeBaseData
  ): AttributeDefinitionData | undefined {
    return attributeDefinitions.find((attributeDefinition: AttributeDefinitionData) => {
      const attributeCodeData = attributeDefinition.attributeCode;
      return (
        attributeCode.code === attributeCodeData.code &&
        attributeCode.system === attributeCodeData.system
      );
    });
  }
}
