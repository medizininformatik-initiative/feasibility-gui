import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConceptElasticSearchService } from '../../service/ConceptFilter/ConceptElasticSearch.service';
import { Observable, Subscription } from 'rxjs';
import { SelectedConceptFilterProviderService } from '../../service/ConceptFilter/SelectedConceptFilterProvider.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-shared-concept-filter',
  templateUrl: './shared-concept-filter.component.html',
  styleUrls: ['./shared-concept-filter.component.scss'],
})
export class SharedConceptFilterComponent implements OnInit, OnDestroy {
  @Input()
  allowedConceptUri: string[] = [];

  @Input()
  preSelectedConcepts: TerminologyCode[] = [];

  @Output()
  changedSelectedConcepts = new EventEmitter<TerminologyCode[]>();

  searchResults$: Observable<CodeableConceptResultList>;

  private subscription: Subscription;

  constructor(
    private selectedConceptFilterService: SelectedConceptFilterProviderService,
    private conceptFilterSearchService: ConceptElasticSearchService
  ) {}

  ngOnInit() {
    if (this.preSelectedConcepts.length > 0) {
      this.selectedConceptFilterService.initializeSelectedConcepts(this.preSelectedConcepts);
    }
    this.searchResults$ = this.conceptFilterSearchService.getCurrentSearchResults();
    this.subscription = this.selectedConceptFilterService
      .getSelectedConcepts()
      .subscribe((selectedConcepts: TerminologyCode[]) => {
        this.updateAndEmitConceptFilter(selectedConcepts);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.conceptFilterSearchService.clearResultList();
    this.selectedConceptFilterService.clearSelectedConceptFilter();
  }

  private updateAndEmitConceptFilter(selectedConcepts: TerminologyCode[]): void {
    this.changedSelectedConcepts.emit(selectedConcepts);
  }
}
