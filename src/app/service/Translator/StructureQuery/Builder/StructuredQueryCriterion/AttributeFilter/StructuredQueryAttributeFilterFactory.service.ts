import { AbstractStructuredQueryFilters } from 'src/app/model/StructuredQuery/Criterion/Abstract/AbstractStructuredQueryFilters';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { ConceptAttributeFilter } from 'src/app/model/StructuredQuery/Criterion/AttributeFilters/ConceptFilter/ConceptAttributeFilter';
import { Injectable } from '@angular/core';
import { StructuredQueryReferenceFilterService } from './StructuredQueryReferenceFilter.service';
import { StructuredQueryQuantityFilterTranslatorService } from '../../StructuredQueryQuantityFilterTranslator.service';

@Injectable({
  providedIn: 'root',
})
export class StructuredQueryAttributeFilterFactoryService {
  constructor(
    private referenceFilterService: StructuredQueryReferenceFilterService,
    private quantityFilterTranslatorService: StructuredQueryQuantityFilterTranslatorService
  ) {}

  public createAttributeFilter(
    attributeFilter: AttributeFilter
  ): AbstractStructuredQueryFilters | undefined {
    const attributeCode = attributeFilter.getAttributeCode();
    if (attributeFilter.isConceptSet() && attributeFilter.getConcept()?.hasSelectedConcepts()) {
      return ConceptAttributeFilter.createFilter(
        attributeCode,
        attributeFilter.getConcept().getSelectedConcepts()
      );
    }

    if (
      attributeFilter.isReferenceSet() &&
      attributeFilter.getReference()?.isSelectedReferenceSet()
    ) {
      return this.referenceFilterService.createReferenceFilter(
        attributeCode,
        attributeFilter.getReference()
      );
    }
    if (attributeFilter.isQuantitySet()) {
      const quantity = attributeFilter.getQuantity();
      this.quantityFilterTranslatorService.translateQuantityAttributeFilter(attributeCode, quantity);
    }
    return undefined;
  }
}
