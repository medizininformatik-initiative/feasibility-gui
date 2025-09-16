import { CloneConcept } from 'src/app/model/Utilities/CriterionCloner/ValueAttributeFilter/Concept/CloneConcept';
import { CodeableConceptResultList } from 'src/app/model/Search/ResultList/CodeableConcepttResultList';
import { CodeableConceptSearchService } from 'src/app/service/Search/SearchTypes/CodeableConcept/CodeableConceptSearch.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { Observable, Subscription } from 'rxjs';
import { SelectedConceptFilterProviderService } from '../../service/ConceptFilter/SelectedConceptFilterProvider.service';

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

    // Subscribe to service changes to keep component in sync
    this.subscription = this.selectedConceptFilterService
      .getSelectedConcepts()
      .subscribe((concepts) => {
        if (
          concepts.length !== this.preSelectedConcepts.length ||
          !concepts.every(
            (concept, index) =>
              this.preSelectedConcepts[index]?.getTerminologyCode().getCode() ===
              concept.getTerminologyCode().getCode()
          )
        ) {
          this.preSelectedConcepts.length = 0;
          this.preSelectedConcepts.push(...concepts);
          this.updateAndEmitConceptFilter(this.preSelectedConcepts);
        }
      });
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
      this.selectedConceptFilterService.addConcept(concept);
      this.updateAndEmitConceptFilter(currentArray);
    } else {
      this.removeConcept(concept);
    }
  }

  public removeConcept(concept: Concept): void {
    const filteredArray = this.preSelectedConcepts.filter(
      (tc) => tc.getTerminologyCode().getCode() !== concept.getTerminologyCode().getCode()
    );
    this.preSelectedConcepts.length = 0;
    this.preSelectedConcepts.push(...filteredArray);
    this.selectedConceptFilterService.removeConcept(concept);
    this.updateAndEmitConceptFilter(this.preSelectedConcepts);
  }
}
