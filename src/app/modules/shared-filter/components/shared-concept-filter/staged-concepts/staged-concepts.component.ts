import { Component, OnInit } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { Observable, of } from 'rxjs';
import { SelectedConceptFilterProviderService } from '../../../service/ConceptFilter/SelectedConceptFilterProvider.service';

@Component({
  selector: 'num-staged-concepts',
  templateUrl: './staged-concepts.component.html',
  styleUrls: ['./staged-concepts.component.scss'],
})
export class StagedConceptsComponent implements OnInit {
  arrayOfSelectedConcepts$: Observable<Concept[]> = of([]);

  constructor(private conceptProviderService: SelectedConceptFilterProviderService) {}

  ngOnInit(): void {
    this.arrayOfSelectedConcepts$ = this.conceptProviderService.getSelectedConcepts();
  }

  public removeSelectedConcept(selectedConcept: Concept): void {
    this.conceptProviderService.removeConcept(selectedConcept);
  }
}
