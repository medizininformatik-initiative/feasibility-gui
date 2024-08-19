import { AbstractConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/AbstractConceptFilter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConceptElasticSearchService } from '../../service/ConceptFilter/ConceptElasticSearchService.service';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { ConceptService } from '../../service/ConceptFilter/ConceptFilter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'num-shared-concept-filter',
  templateUrl: './shared-concept-filter.component.html',
  styleUrls: ['./shared-concept-filter.component.scss'],
})
export class SharedConceptFilterComponent implements OnInit, OnDestroy {
  @Input()
  conceptFilter: ConceptFilter;

  @Output()
  changedConceptFilter = new EventEmitter<AbstractConceptFilter>();

  testUri = ['test'];

  searchResults: CodeableConceptResultList;
  private subscription: Subscription;

  constructor(
    private conceptService: ConceptService,
    private conceptFiletrSearchService: ConceptElasticSearchService
  ) {}

  ngOnInit() {
    this.conceptService.initializeSelectedConcepts(this.conceptFilter);
    this.conceptService.getSelectedConcepts().subscribe(() => {
      this.updateAndEmitConceptFilter();
    });

    this.subscription = this.conceptFiletrSearchService
      .getCurrentSearchResults()
      .subscribe((searchTermResults: CodeableConceptResultList) => {
        if (searchTermResults) {
          console.log(searchTermResults);
          this.searchResults = searchTermResults;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateAndEmitConceptFilter(): void {
    this.conceptService.getSelectedConcepts().subscribe((selectedConcepts) => {
      this.conceptFilter.setSelectedConcepts(selectedConcepts);
      this.changedConceptFilter.emit(this.conceptFilter);
    });
  }
}
