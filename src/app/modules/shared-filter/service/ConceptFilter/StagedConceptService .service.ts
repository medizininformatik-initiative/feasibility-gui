import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Injectable({
  providedIn: 'root',
})
export class StagedConceptService {
  private stagedConceptsSubject: BehaviorSubject<Set<TerminologyCode>> = new BehaviorSubject<
    Set<TerminologyCode>
  >(new Set());
  stagedConcepts$: Observable<Set<TerminologyCode>> = this.stagedConceptsSubject.asObservable();

  constructor() {}

  addStagedConcept(terminologyCode: TerminologyCode): void {
    const currentSet = this.stagedConceptsSubject.getValue();
    if (
      !Array.from(currentSet).some((concept) => concept.getCode() === terminologyCode.getCode())
    ) {
      currentSet.add(terminologyCode);
      this.stagedConceptsSubject.next(currentSet);
    }
  }

  removeStagedConcept(terminologyCode: string): void {
    const currentSet = this.stagedConceptsSubject.getValue();
    const filteredSet = new Set(
      Array.from(currentSet).filter((concept) => concept.getCode() !== terminologyCode)
    );
    this.stagedConceptsSubject.next(filteredSet);
  }

  getStagedConcepts(): Observable<Set<TerminologyCode>> {
    return this.stagedConcepts$;
  }

  clearStagedConcepts(): void {
    this.stagedConceptsSubject.next(new Set());
  }
}
