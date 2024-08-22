import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';

@Component({
  selector: 'num-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Input()
  filter: SearchTermFilter;

  @Output()
  filterChanged = new EventEmitter<SearchTermFilter>();

  constructor() {}

  ngOnInit(): void {}

  onSelectionChange(selectedValues: string[]): void {
    if (this.filter) {
      this.filter.setSelectedValues(selectedValues);
      this.filterChanged.emit(this.filter);
    }
  }
}
