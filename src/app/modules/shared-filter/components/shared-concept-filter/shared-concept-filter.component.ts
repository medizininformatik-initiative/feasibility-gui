import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConceptElasticSearchService } from '../../service/ConceptFilter/ConceptElasticSearch.service';
import { ConceptFilterProviderService } from '../../service/ConceptFilter/ConceptFilterProvider.service';
import { Observable, Subscription } from 'rxjs';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-shared-concept-filter',
  templateUrl: './shared-concept-filter.component.html',
  styleUrls: ['./shared-concept-filter.component.scss'],
})
export class SharedConceptFilterComponent implements OnInit, OnDestroy {
  @Input()
  allowedConceptUri: string[] = ['test'];

  @Input()
  preSelectedConcepts: TerminologyCode[] = [];

  @Output()
  changedSelectedConcepts = new EventEmitter<TerminologyCode[]>();

  searchResults$: Observable<CodeableConceptResultList>;

  private subscription: Subscription;

  constructor(
    private conceptService: ConceptFilterProviderService,
    private conceptFilterSearchService: ConceptElasticSearchService
  ) {}

  ngOnInit() {
    this.conceptService.initializeSelectedConcepts(this.preSelectedConcepts);
    this.searchResults$ = this.conceptFilterSearchService.getCurrentSearchResults();

    this.subscription = this.conceptService
      .getSelectedConcepts()
      .subscribe((selectedConcepts: TerminologyCode[]) => {
        this.updateAndEmitConceptFilter(selectedConcepts);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateAndEmitConceptFilter(selectedConcepts: TerminologyCode[]): void {
    this.changedSelectedConcepts.emit(selectedConcepts);
  }
}
