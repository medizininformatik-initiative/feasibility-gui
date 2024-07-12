import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { Observable, of, Subscription } from 'rxjs';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FilterChipService,
  InterfaceFilterChip,
  InterfaceFilterChipData,
} from '../../models/filter-chip.interface';

@Component({
  selector: 'num-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
  providers: [FilterChipService],
})
export class FilterChipsComponent implements OnInit, OnDestroy {
  chipData$: Observable<InterfaceFilterChip[]> = of([]);

  @Input()
  criterion: Criterion;

  subscription: Subscription;

  constructor(private filterChipService: FilterChipService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadFilterChips();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadFilterChips() {
    this.filterChipService.getFilterChips().subscribe((chips) => {
      this.chipData$ = of(chips);
    });
    this.filterChipService.getFilterChipsQuantity(this.criterion);
    this.filterChipService.getFilterChipsTimeRestriction(this.criterion);
    this.criterion.getAttributeFilters().forEach((attributeFilter) => {
      this.filterChipService.getCodeableConceptChips(attributeFilter);
    });
  }

  toggleExpanded(chip) {
    chip.expanded = !chip.expanded;
  }
}
