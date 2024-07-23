import { BehaviorSubject, Observable } from 'rxjs';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FilterChipConceptAdapter } from '../models/FilterChips/Adapter/FilterChipConceptAdapter';
import { FilterChipQuantityAdapter } from '../models/FilterChips/Adapter/FilterChipQuantityAdapter';
import { FilterChipTimeRestrictionAdapter } from '../models/FilterChips/Adapter/FilterChipTimeRestrictionAdapter';
import { Injectable } from '@angular/core';
import { InterfaceFilterChip } from '../models/FilterChips/InterfaceFilterChip';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Injectable({
  providedIn: 'root',
})
export class FilterChipService {
  private filterChipsSubject: BehaviorSubject<InterfaceFilterChip[]> = new BehaviorSubject<
    InterfaceFilterChip[]
  >([]);
  filterChips$: Observable<InterfaceFilterChip[]> = this.filterChipsSubject.asObservable();

  constructor() {}

  getFilterChips(): Observable<InterfaceFilterChip[]> {
    return this.filterChipsSubject.asObservable();
  }

  getCodeableConceptChips(conceptFilter: ConceptFilter, attributeCode?: TerminologyCode) {
    const currentChips = this.filterChipsSubject.getValue();
    const newChips = FilterChipConceptAdapter.adaptCodeableConcept(conceptFilter, attributeCode);
    newChips.forEach((newChip) => {
      const existingChipIndex = currentChips.findIndex((chip) => chip.type === newChip.type);
      if (existingChipIndex !== -1) {
        currentChips[existingChipIndex].data = [
          ...currentChips[existingChipIndex].data,
          ...newChip.data,
        ];
      } else {
        currentChips.push(newChip);
      }
    });
    this.filterChipsSubject.next(currentChips);
  }

  getFilterChipsTimeRestriction(criterion: Criterion) {
    const currentChips = this.filterChipsSubject.getValue();
    const timeRestriction = criterion.getTimeRestriction();
    if (timeRestriction?.getBeforeDate() !== null || timeRestriction?.getAfterDate()) {
      const newChips = FilterChipTimeRestrictionAdapter.adaptTimeRestriction(criterion);
      this.updateChips(currentChips, newChips);
    }
    this.filterChipsSubject.next(currentChips);
  }

  getFilterChipsQuantity(criterion: Criterion) {
    const currentChips = this.filterChipsSubject.getValue();
    const attributeFilters = criterion.getAttributeFilters();
    if (criterion.getValueFilters()[0]?.getQuantity()?.getComparator()) {
      const newChips = FilterChipQuantityAdapter.adaptQuantity(
        criterion.getValueFilters()[0].getQuantity()
      );
      this.updateChips(currentChips, newChips);
    }
    if (attributeFilters.length > 0) {
      attributeFilters.forEach((attributeFilter) => {
        if (attributeFilter.isQuantitySet()) {
          const newChips = FilterChipQuantityAdapter.adaptQuantity(attributeFilter.getQuantity());
          this.updateChips(currentChips, newChips);
        }
      });
    }
    this.filterChipsSubject.next(currentChips);
  }

  private updateChips(currentChips: InterfaceFilterChip[], newChips: InterfaceFilterChip[]) {
    newChips.forEach((newChip) => {
      const existingChipIndex = currentChips.findIndex((chip) => chip.type === newChip.type);
      if (existingChipIndex !== -1) {
        currentChips[existingChipIndex] = newChip;
      } else {
        currentChips.push(newChip);
      }
    });
  }
}
