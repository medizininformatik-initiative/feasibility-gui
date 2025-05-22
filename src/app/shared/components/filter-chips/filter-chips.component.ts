import { Component, Input, OnInit } from '@angular/core';
import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';
import { DisplayData } from '../../../model/Interface/DisplayData';
import { DisplayTranslationPipe } from '../../pipes/DisplayTranslationPipe';

@Component({
  selector: 'num-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent implements OnInit {
  chipData$: Observable<InterfaceFilterChip[]> = of([]);

  @Input()
  filterChips: InterfaceFilterChip[] = [];

  @Input()
  displayBlockTriangle = true;

  constructor(private translation: DisplayTranslationPipe) {}

  ngOnInit(): void {
    console.log('FilterChipsComponent ngOnInit', this.filterChips);
  }

  public toggleExpanded(chip) {
    chip.expanded = !chip.expanded;
  }
  public toggleTypeExpanded(chip) {
    chip.typeExpanded = !chip.typeExpanded;
    if (chip.typeExpanded) {
      chip.twoLineDisplay = this.getLength(chip.type) > 22;
    } else {
      chip.twoLineDisplay = false;
    }
  }

  public getLength(display: DisplayData): number {
    return this.translation.transform(display).length;
  }
}
