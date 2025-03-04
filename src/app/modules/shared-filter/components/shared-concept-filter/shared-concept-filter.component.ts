import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { Observable, Subscription } from 'rxjs';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SelectedConceptFilterProviderService } from '../../service/ConceptFilter/SelectedConceptFilterProvider.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-shared-concept-filter',
  templateUrl: './shared-concept-filter.component.html',
  styleUrls: ['./shared-concept-filter.component.scss'],
  providers: [SelectedConceptFilterProviderService],
})
export class SharedConceptFilterComponent implements OnInit, OnDestroy {
  @Input()
  valueSetUrl: string[];

  @Input()
  conceptFilterId: string;

  @Input()
  preSelectedConcepts: Concept[] = [];

  @Output()
  changedSelectedConcepts = new EventEmitter<Concept[]>();

  searchResults$: Observable<CodeableConceptResultList>;

  private subscription: Subscription;

  constructor(
    private selectedConceptFilterService: SelectedConceptFilterProviderService,
    private searchResultProvider: SearchResultProvider
  ) {}

  ngOnInit() {
    if (this.preSelectedConcepts.length > 0) {
      this.selectedConceptFilterService.initializeSelectedConcepts(this.preSelectedConcepts);
    }
    this.searchResults$ = this.searchResultProvider.getCodeableConceptSearchResults(
      this.conceptFilterId
    );
    this.subscription = this.selectedConceptFilterService
      .getSelectedConcepts()
      .subscribe((selectedConcepts: Concept[]) => {
        this.updateAndEmitConceptFilter(selectedConcepts);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.selectedConceptFilterService.clearSelectedConceptFilter();
  }

  private updateAndEmitConceptFilter(selectedConcepts: Concept[]): void {
    this.changedSelectedConcepts.emit(selectedConcepts);
  }
}
