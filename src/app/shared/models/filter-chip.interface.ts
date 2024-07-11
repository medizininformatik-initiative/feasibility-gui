import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { QuantityComparisonOption } from 'src/app/model/QuantityFilterOptions';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

export interface InterfaceFilterChip {
  type: FilterTypes | TimeRestrictionType
  data: InterfaceFilterChipData[]
}

export interface InterfaceFilterChipData {
  id: string
  text: string
  expanded: boolean
}

export class FilterChipAdapter {
  public static adaptCodeableConcept(attributeFilter: AttributeFilter): InterfaceFilterChip[] {
    const selectedConcepts = attributeFilter.getConcept().getSelectedConcepts();
    const filterChips: InterfaceFilterChip[] = [];

    selectedConcepts.forEach((concept: TerminologyCode) => {
      filterChips.push({
        type: FilterTypes.CONCEPT,
        data: [
          {
            id: uuidv4(),
            text: concept.getDisplay(),
            expanded: false,
          },
        ],
      });
    });

    return filterChips;
  }

  static adaptQuantity(criterion: Criterion) {
    const chips: InterfaceFilterChip[] = [];
    const valueFilters = criterion.getValueFilters();
    if (valueFilters && valueFilters.length > 0) {
      const quantity = valueFilters[0]?.getQuantity();

      if (quantity) {
        const display = quantity.getSelectedUnit().getDisplay();
        const comparator = quantity.getComparator();
        switch (comparator) {
          case QuantityComparisonOption.BETWEEN:
            const quantityRange = quantity as QuantityRangeFilter;
            const quantityRangeMinValue = quantityRange.getMinValue();
            const quantityRangeMaxValue = quantityRange.getMaxValue();
            const quantityRangeText = `Between ${quantityRangeMinValue} and ${quantityRangeMaxValue} ${display}`;
            chips.push({
              type: FilterTypes.QUANTITY,
              data: [
                {
                  id: uuidv4(),
                  text: quantityRangeText,
                  expanded: false,
                },
              ],
            });
            break;

          case QuantityComparisonOption.EQUAL:
          case QuantityComparisonOption.GREATER_THAN:
          case QuantityComparisonOption.LESS_THAN:
            const quantityComparator = quantity as QuantityComparatorFilter;
            const quantityComparatorValue = quantityComparator.getValue();
            const quantityComparatorText = `${quantityComparatorValue} ${display}`;
            chips.push({
              type: FilterTypes.QUANTITY,
              data: [
                {
                  id: uuidv4(),
                  text: quantityComparatorText,
                  expanded: false,
                },
              ],
            });
            break;
          default:
            break;
        }
      }
    }
    return chips;
  }

  static adaptTimeRestriction(criterion: Criterion): InterfaceFilterChip[] {
    const chips: InterfaceFilterChip[] = [];
    const timeRestriction = criterion.getTimeRestriction();
    if (timeRestriction) {
      switch (timeRestriction.type) {
        case TimeRestrictionType.BETWEEN:
          chips.push({
            type: TimeRestrictionType.BETWEEN,
            data: [
              {
                id: uuidv4(),
                text: `From ${timeRestriction.getBeforeDate()} to ${timeRestriction.getAfterDate()}`,
                expanded: false,
              },
            ],
          });
          break;
        case TimeRestrictionType.AT:
          chips.push({
            type: TimeRestrictionType.AT,
            data: [
              {
                id: uuidv4(),
                text: `At ${timeRestriction.getBeforeDate()}`,
                expanded: false,
              },
            ],
          });
          break;
        case TimeRestrictionType.BEFORE:
          chips.push({
            type: TimeRestrictionType.BEFORE,
            data: [
              {
                id: uuidv4(),
                text: `Before ${timeRestriction.getBeforeDate()}`,
                expanded: false,
              },
            ],
          });
          break;
        case TimeRestrictionType.AFTER:
          chips.push({
            type: TimeRestrictionType.AFTER,
            data: [
              {
                id: uuidv4(),
                text: `After ${timeRestriction.getAfterDate()}`,
                expanded: false,
              },
            ],
          });
          break;
      }
    }
    return chips;
  }
}

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

  getCodeableConceptChips(attributeFilter: AttributeFilter) {
    const currentChips = this.filterChipsSubject.getValue();
    const newChips = FilterChipAdapter.adaptCodeableConcept(attributeFilter);
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
      const newChips = FilterChipAdapter.adaptTimeRestriction(criterion);
      this.updateChips(currentChips, newChips);
    }
    this.filterChipsSubject.next(currentChips);
  }

  getFilterChipsQuantity(criterion: Criterion) {
    const currentChips = this.filterChipsSubject.getValue();
    if (criterion.getValueFilters()[0]?.getQuantity().getComparator()) {
      const newChips = FilterChipAdapter.adaptQuantity(criterion);
      this.updateChips(currentChips, newChips);
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
