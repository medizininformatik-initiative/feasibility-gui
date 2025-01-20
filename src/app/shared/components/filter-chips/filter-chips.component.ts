import { Component, Input, OnInit } from '@angular/core';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';

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
  public toggleTypeExpanded(chip) {
    chip.typeExpanded = !chip.typeExpanded;
  }

  public isDisplayData(text: any): boolean {
    return text && text instanceof DisplayData;
  }
}
