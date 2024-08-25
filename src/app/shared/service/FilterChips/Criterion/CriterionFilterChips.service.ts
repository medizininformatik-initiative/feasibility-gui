import { BehaviorSubject, Observable } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { Injectable } from '@angular/core';
import { InterfaceFilterChip } from '../../../models/FilterChips/InterfaceFilterChip';
import { QuantityFilterChipService } from './QuantityFilterChipService.service';
import { TimeRestrictionChipService } from './TimeRestrictionChip.service';
import { ConceptFilterChipService } from './ConceptFilterChipService.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionFilterChipService {
  private filterChipsSubject: BehaviorSubject<InterfaceFilterChip[]> = new BehaviorSubject<
    InterfaceFilterChip[]
  >([]);
  filterChips$: Observable<InterfaceFilterChip[]> = this.filterChipsSubject.asObservable();

  constructor(
    private conceptFilterChipService: ConceptFilterChipService,
    private quantityFilterChipService: QuantityFilterChipService,
    private timeRestrictionChipService: TimeRestrictionChipService
  ) {}

  public generateFilterChipsFromCriterion(criterion: Criterion): Observable<InterfaceFilterChip[]> {
    this.filterChipsSubject.next([]);

    const conceptChips = this.generateConceptChips(criterion);
    const quantityChips = this.generateQuantityChips(criterion);
    const timeRestrictionChips = this.timeRestrictionChipService.generateTimeRestrictionChips(
      criterion.getTimeRestriction()
    );

    const allChips = [...conceptChips, ...quantityChips, ...timeRestrictionChips];
    this.filterChipsSubject.next(allChips);

    return this.filterChipsSubject.asObservable();
  }

  private generateConceptChips(criterion: Criterion): InterfaceFilterChip[] {
    const attributeFilters = criterion.getAttributeFilters();
    const valueFilters = criterion.getValueFilters();

    const attributeChips =
      this.conceptFilterChipService.generateConceptChipsFromAttributeFilters(attributeFilters);
    const valueChips =
      this.conceptFilterChipService.generateConceptChipsFromValueFilters(valueFilters);

    return [...attributeChips, ...valueChips];
  }

  private generateQuantityChips(criterion: Criterion): InterfaceFilterChip[] {
    const attributeFilters = criterion.getAttributeFilters();
    const valueFilters = criterion.getValueFilters();

    const attributeChips =
      this.quantityFilterChipService.generateQuantityChipsFromAttributeFilters(attributeFilters);
    const valueChips =
      this.quantityFilterChipService.generateQuantityChipsFromValueFilters(valueFilters);

    return [...attributeChips, ...valueChips];
  }
}
