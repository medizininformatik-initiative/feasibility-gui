import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectedConceptFilterProviderService } from '../../../service/ConceptFilter/SelectedConceptFilterProvider.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-staged-concepts',
  templateUrl: './staged-concepts.component.html',
  styleUrls: ['./staged-concepts.component.scss'],
})
export class StagedConceptsComponent implements OnInit {
  arrayOfSelectedConcepts$: Observable<TerminologyCode[]> = of([]);

  constructor(private conceptProviderService: SelectedConceptFilterProviderService) {}

  ngOnInit(): void {
    this.arrayOfSelectedConcepts$ = this.conceptProviderService.getSelectedConcepts();
  }

  public removeSelectedConcept(selectedConcept: TerminologyCode): void {
    this.conceptProviderService.removeConcept(selectedConcept);
  }
}
