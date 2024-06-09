import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';

@Component({
  selector: 'num-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  filters$: Observable<Array<SearchTermFilter>>;
  filterControls: FormArray;

  @Output() filtersChanged = new EventEmitter<Array<string>>();

  constructor(
    private elasticSearchService: ElasticSearchService,
    private formBuilder: FormBuilder
  ) {
    this.filterControls = this.formBuilder.array([]);
  }

  /**
   *  Initialize form controls when filters are received
   *  Subscribe to value changes of the form array
   */
  ngOnInit(): void {
    this.filters$ = this.elasticSearchService.getElasticSearchFilter();
    this.filters$.subscribe((filters) => {
      this.initFormControls(filters);
    });

    this.filterControls.valueChanges.subscribe((values) => {
      this.onFiltersChange(values);
    });
  }

  initFormControls(filters: Array<SearchTermFilter>): void {
    this.filterControls.clear();
    filters.forEach(() => {
      this.filterControls.push(this.formBuilder.control([]));
    });
  }

  onFiltersChange(values: Array<string>): void {
    this.filtersChanged.emit(values);
  }
}
