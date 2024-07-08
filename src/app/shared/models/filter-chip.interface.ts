import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { FilterTypes } from 'src/app/model/FilterTypes';
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

  setFilterChips(criterion: Criterion) {
    const chips = FilterChipAdapter.adaptTimeRestriction(criterion);
    this.filterChipsSubject.next(chips);
  }

  getFilterChipsTimeRestriction(criterion: Criterion): Observable<InterfaceFilterChip[]> {
    const chips = FilterChipAdapter.adaptTimeRestriction(criterion);
    return of(chips);
  }

  getCodeableConceptChips(attributeFilter: AttributeFilter): InterfaceFilterChip[] {
    return FilterChipAdapter.adaptCodeableConcept(attributeFilter);
  }
}
