import { Component, OnInit } from '@angular/core';
import { ConceptFilterProviderService } from '../../../service/ConceptFilter/ConceptFilterProvider.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { Observable, of } from 'rxjs';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-staged-concepts',
  templateUrl: './staged-concepts.component.html',
  styleUrls: ['./staged-concepts.component.scss'],
})
export class StagedConceptsComponent implements OnInit {
  arrayOfSelectedConcepts$: Observable<TerminologyCode[]> = of([]);

  constructor(private conceptProviderService: ConceptFilterProviderService) {}

  ngOnInit(): void {
    this.arrayOfSelectedConcepts$ = this.conceptProviderService.getSelectedConcepts();
  }

  public removeSelectedConcept(selectedConcept: TerminologyCode): void {
    this.conceptProviderService.removeConcept(selectedConcept);
  }
}
