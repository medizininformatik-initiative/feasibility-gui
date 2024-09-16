import { AbstractStructuredQueryFilters } from 'src/app/model/StructuredQuery/Criterion/Abstract/AbstractStructuredQueryFilters';
import { ConceptValueFilter } from 'src/app/model/StructuredQuery/Criterion/ValueFilter/ConceptFilter/ConceptValueFilter';
import { Injectable } from '@angular/core';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { StructuredQueryQuantityFilterTranslatorService } from '../../StructuredQueryQuantityFilterTranslator.service';

@Injectable({
  providedIn: 'root',
})
export class StructuredQueryValueFilterFactoryService {
  constructor(private quantityService: StructuredQueryQuantityFilterTranslatorService) {}

  public createValueFilter(valueFilter: ValueFilter): AbstractStructuredQueryFilters | undefined {
    if (valueFilter.isQuantitySet()) {
      const quantity = valueFilter.getQuantity();
      return this.quantityService.translateQuantityValueFilter(quantity);
    }
    if (valueFilter.getConcept()?.getSelectedConcepts().length > 0) {
      new ConceptValueFilter(Array.from(valueFilter.getConcept().getSelectedConcepts()));
    }
  }
}
