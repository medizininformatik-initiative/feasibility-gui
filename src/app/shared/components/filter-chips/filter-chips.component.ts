import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'num-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent implements OnInit {
  chipData$: Observable<InterfaceFilterChip[]> = of([]);

  @Input()
  filterChips: InterfaceFilterChip[] = [];

  constructor() {}

  ngOnInit(): void {}

  public toggleExpanded(chip) {
    chip.expanded = !chip.expanded;
  }
}
