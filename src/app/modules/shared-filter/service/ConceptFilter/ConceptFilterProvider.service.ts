import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { TerminologyCodeService } from '../TerminologyService/TerminologyCode.service';

@Injectable({
  providedIn: 'root',
})
export class ConceptFilterProviderService {
  private selectedConceptsSubject: BehaviorSubject<Array<TerminologyCode>> = new BehaviorSubject<
    Array<TerminologyCode>
  >([]);
  selectedConcepts$: Observable<Array<TerminologyCode>> =
    this.selectedConceptsSubject.asObservable();

  constructor(private terminologyCodeService: TerminologyCodeService) {}

  public initializeSelectedConcepts(terminologyCodes: TerminologyCode[]): void {
    this.selectedConceptsSubject.next(terminologyCodes);
    terminologyCodes.forEach((tc) => this.terminologyCodeService.addTerminologyCode(tc));
  }

  public isConceptSelected(terminologyCode: TerminologyCode): boolean {
    return this.selectedConceptsSubject
      .getValue()
      .some((tc) => tc.getCode() === terminologyCode.getCode());
  }

  public addConcept(terminologyCode: TerminologyCode): void {
    const currentArray = this.selectedConceptsSubject.getValue();
    if (!currentArray.some((tc) => tc.getCode() === terminologyCode.getCode())) {
      currentArray.push(terminologyCode);
      this.selectedConceptsSubject.next(currentArray);
      this.terminologyCodeService.addTerminologyCode(terminologyCode);
    }
  }

  public addConcepts(terminologyCodes: TerminologyCode[]): void {
    terminologyCodes.map((terminologyCode) => this.addConcept(terminologyCode));
  }

  public removeConcept(terminologyCode: TerminologyCode): void {
    const currentArray = this.selectedConceptsSubject.getValue();
    const updatedArray = currentArray.filter((tc) => tc.getCode() !== terminologyCode.getCode());

    if (updatedArray.length !== currentArray.length) {
      this.selectedConceptsSubject.next(updatedArray);
      this.terminologyCodeService.removeTerminologyCode(terminologyCode.getCode());
    }
  }

  public getSelectedConcepts(): Observable<Array<TerminologyCode>> {
    return this.selectedConcepts$;
  }

  public getTerminologyCodeDetails(code: string): TerminologyCode | undefined {
    return this.terminologyCodeService.getTerminologyCode(code);
  }
}
