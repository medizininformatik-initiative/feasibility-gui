import { AbstractAttributeFilters } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { FilterTypesService } from '../FilterTypes.service';
import { Injectable } from '@angular/core';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';

@Injectable({
  providedIn: 'root',
})
export class FilterValidationService {
  constructor(private filterTypeService: FilterTypesService) {}

  public isConceptFilterSet(conceptFilter: ConceptFilter, optional: boolean): boolean {
    return optional ? true : this.hasSelectedConcepts(conceptFilter);
  }

  private hasSelectedConcepts(conceptFilter: ConceptFilter): boolean {
    return conceptFilter.getSelectedConcepts().length > 0;
  }

  private hasSetQuantity(filter: AbstractAttributeFilters): boolean {
    return !this.filterTypeService.isQuantityNotSet(filter.getQuantity()?.getType());
  }
}
