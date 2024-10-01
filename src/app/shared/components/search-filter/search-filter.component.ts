import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { SearchFilter } from '../../models/SearchFilter/InterfaceSearchFilter';

@Component({
  selector: 'num-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Input()
  filter: SearchFilter;

  @Output()
  selectedFilterChanged = new EventEmitter<{ values: string[]; type: ElasticSearchFilterTypes }>();

  selectedValues: string[];

  translatedLabel: { translatedSystem: string; count: number; url: string }[] = [];
  constructor() {}

  ngOnInit(): void {}

  onSelectionChange(): void {
    const filterType =
      ElasticSearchFilterTypes[
        this.filter.filterType.toUpperCase() as keyof typeof ElasticSearchFilterTypes
      ];
    this.selectedFilterChanged.emit({ values: this.selectedValues, type: filterType });
  }
}
