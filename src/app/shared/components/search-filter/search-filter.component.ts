import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
// Import FormGroup

@Component({
  selector: 'num-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  filters$: Observable<Array<SearchTermFilter>>;
  filterControls: FormArray;
  form: FormGroup; // Declare form property

  @Output() filtersChanged = new EventEmitter<Array<string>>();

  constructor(
    private elasticSearchService: ElasticSearchService<SearchTermResultList, SearchTermListEntry>,
    private formBuilder: FormBuilder
  ) {
    this.filterControls = this.formBuilder.array([]);
    this.form = this.formBuilder.group({
      filterControls: this.filterControls, // Assign filterControls to the form group
    });
  }

  ngOnInit(): void {
    this.filters$ = this.elasticSearchService.getElasticSearchFilter();
    this.filters$.subscribe((filters) => {
      this.initFormControls(filters);
      this.filterControls.valueChanges.subscribe((values) => {
        this.onFiltersChange(values);
      });
    });
  }
  initFormControls(filters: Array<SearchTermFilter>): void {
    this.filterControls.clear();
    filters.forEach(() => {
      this.filterControls.push(this.formBuilder.control('')); // Initialize each control as a single FormControl
    });
  }

  onFiltersChange(values: Array<string>): void {
    this.filtersChanged.emit(values);
  }
}
