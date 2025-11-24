import { BulkCodeableConceptSearchEngineService } from 'src/app/service/Search/SearchTypes/BulkCodeableConcept/BulkCodeableConceptSearchEngine';
import { CloneConcept } from 'src/app/model/Utilities/CriterionCloner/ValueAttributeFilter/Concept/CloneConcept';
import { CodeableConceptBulkEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptBulkEntryAdapter';
import { CodeableConceptBulkResultList } from 'src/app/model/Search/ResultList/CodeableConceptBulkResultList';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { map, Observable, of, Subscription } from 'rxjs';
import { SelectedConceptFilterProviderService } from '../../service/ConceptFilter/SelectedConceptFilterProvider.service';

@Component({
  selector: 'num-concept-bulk-search',
  templateUrl: './concept-bulk-search.component.html',
  styleUrls: ['./concept-bulk-search.component.scss'],
})
export class ConceptBulkSearchComponent implements OnInit, OnDestroy {
  @Input()
  valueSetUrl: string;

  @Input()
  conceptFilterId: string;

  @Input()
  preSelectedConcepts: Concept[] = [];

  @Output()
  changedSelectedConcepts = new EventEmitter<Concept[]>();

  searchResults$: Observable<CodeableConceptBulkResultList> = of(undefined);
  bulkSearchTermInput: string;
  private subscription: Subscription;

  adaptedData;

  constructor(
    private selectedConceptFilterService: SelectedConceptFilterProviderService,
    private searchResultProvider: BulkCodeableConceptSearchEngineService
  ) {}

  ngOnInit() {
    if (this.preSelectedConcepts.length > 0) {
      this.selectedConceptFilterService.initializeSelectedConcepts(this.preSelectedConcepts);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.selectedConceptFilterService.clearSelectedConceptFilter();
  }

  public updateAndEmitConceptFilter(selectedConcept: Concept[]): void {
    this.changedSelectedConcepts.emit(CloneConcept.deepCopyConcepts(selectedConcept));
  }

  bulkSearch(): void {
    console.log('Bulk search term changed:', this.bulkSearchTermInput);
    this.adaptedData = this.searchResultProvider
      .search(
        this.bulkSearchTermInput,
        'https://www.medizininformatik-initiative.de/fhir/core/modul-diagnose/ValueSet/diagnoses-sct'
      )
      .pipe(
        map((resultList: CodeableConceptBulkResultList) => {
          const test = CodeableConceptBulkEntryAdapter.adaptFound(resultList.getFound());
          console.log('Adapted Data:', test);
          return test;
        })
      )
      .subscribe((data) => (this.adaptedData = data));
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
      this.preSelectedConcepts = newConcepts;
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
