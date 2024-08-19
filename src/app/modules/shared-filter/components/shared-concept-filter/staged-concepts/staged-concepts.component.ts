import { Component, OnInit } from '@angular/core';
import { ConceptService } from '../../../service/ConceptFilter/ConceptFilter.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-staged-concepts',
  templateUrl: './staged-concepts.component.html',
  styleUrls: ['./staged-concepts.component.scss'],
})
export class StagedConceptsComponent implements OnInit {
  arrayOfSelectedConcepts: TerminologyCode[] = [];

  constructor(private conceptService: ConceptService) {}

  ngOnInit(): void {
    this.conceptService.getSelectedConcepts().subscribe((selectedConcepts) => {
      this.arrayOfSelectedConcepts = Array.from(selectedConcepts);
    });
  }

  public removeSelectedConcept(selectedConcept: TerminologyCode): void {
    this.conceptService.removeConcept(selectedConcept.getCode());
  }
}
