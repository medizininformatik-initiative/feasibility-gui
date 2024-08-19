import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConceptElasticSearchService } from './ConceptElasticSearchService.service';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Injectable({
  providedIn: 'root',
})
export class ConceptService {
  private selectedConceptsSubject: BehaviorSubject<Set<TerminologyCode>> = new BehaviorSubject<
    Set<TerminologyCode>
  >(new Set());
  selectedConcepts$: Observable<Set<TerminologyCode>> = this.selectedConceptsSubject.asObservable();

  constructor(private conceptElasticSearchService: ConceptElasticSearchService) {}

  public initializeSelectedConcepts(conceptFilter: ConceptFilter): void {
    if (conceptFilter && conceptFilter.isSelectedConceptSet()) {
      this.selectedConceptsSubject.next(new Set(conceptFilter.getSelectedConcepts()));
    }
  }

  public isConceptSelected(terminologyCode: string): boolean {
    const isSelected = Array.from(this.selectedConceptsSubject.getValue()).some(
      (concept) => concept.getCode() === terminologyCode
    );
    return isSelected;
  }

  public addConcept(terminologyCode: TerminologyCode): void {
    const currentSet = this.selectedConceptsSubject.getValue();
    if (
      !Array.from(currentSet).some((concept) => concept.getCode() === terminologyCode.getCode())
    ) {
      currentSet.add(terminologyCode);
      this.selectedConceptsSubject.next(currentSet);
    }
  }

  public removeConcept(terminologyCode: string): void {
    const currentSet = this.selectedConceptsSubject.getValue();
    const filteredSet = new Set(
      Array.from(currentSet).filter((concept) => concept.getCode() !== terminologyCode)
    );
    this.selectedConceptsSubject.next(filteredSet);
  }

  public getSelectedConcepts(): Observable<Set<TerminologyCode>> {
    return this.selectedConcepts$;
  }
}
