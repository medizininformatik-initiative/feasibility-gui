import { CodeableConceptResultList } from 'src/app/model/Search/ResultList/CodeableConcepttResultList';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { Observable, Subscription } from 'rxjs';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SelectedConceptFilterProviderService } from '../../service/ConceptFilter/SelectedConceptFilterProvider.service';
import { CloneConcept } from 'src/app/model/Utilities/CriterionCloner/ValueAttributeFilter/Concept/CloneConcept';
import { CodeableConceptSearchService } from 'src/app/service/Search/SearchTypes/CodeableConcept/CodeableConceptSearch.service';

@Component({
  selector: 'num-shared-concept-filter-copy',
  templateUrl: './copy_shared-concept-filter.component.html',
  styleUrls: ['./copy_shared-concept-filter.component.scss'],
  providers: [SelectedConceptFilterProviderService],
})
export class CopySharedConceptFilterComponent implements OnInit, OnDestroy {
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
    private searchResultProvider: CodeableConceptSearchService
  ) {}

  ngOnInit() {
    if (this.preSelectedConcepts.length > 0) {
      this.selectedConceptFilterService.initializeSelectedConcepts(this.preSelectedConcepts);
    }
    this.searchResults$ = this.searchResultProvider.getSearchResults(this.valueSetUrl);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.selectedConceptFilterService.clearSelectedConceptFilter();
  }

  public updateAndEmitConceptFilter(selectedConcept: Concept[]): void {
    this.changedSelectedConcepts.emit(CloneConcept.deepCopyConcepts(selectedConcept));
  }

  public addConcept(concept: Concept): void {
    const currentArray = this.preSelectedConcepts;
    if (
      !currentArray.some(
        (tc) => tc.getTerminologyCode().getCode() === concept.getTerminologyCode().getCode()
      )
    ) {
      currentArray.push(concept);
      this.updateAndEmitConceptFilter(currentArray);
    } else {
      const newConcepts = this.removeConcept(concept);
      this.updateAndEmitConceptFilter(newConcepts);
    }
  }

  public removeConcept(concept: Concept): Concept[] {
    const currentArray = this.preSelectedConcepts;
    return currentArray.filter(
      (tc) => tc.getTerminologyCode().getCode() !== concept.getTerminologyCode().getCode()
    );
  }
}
