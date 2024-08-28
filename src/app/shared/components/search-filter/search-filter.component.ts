import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { values } from 'lodash';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

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

  translatedLabel: { translatedSystem: string; count: number; url: string }[] = []; // Initialize as an empty array

  constructor() {}

  ngOnInit(): void {
    if (this.filter) {
      this.filter.getValues().forEach((value) => {
        this.translatedLabel.push({
          translatedSystem: TerminologySystemDictionary.getNameByUrl(value.getlabel()),
          count: value.getCount(),
          url: value.getlabel(),
        });
      });
    }
  }

  onSelectionChange(selectedValues: string[]): void {
    if (this.filter) {
      this.filter.setSelectedValues(selectedValues);
      this.filterChanged.emit(this.filter);
    }
  }
}
