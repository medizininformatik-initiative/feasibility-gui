import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConceptElasticSearchService } from '../../../service/ConceptFilter/ConceptElasticSearch.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { SelectedConceptFilterProviderService } from '../../../service/ConceptFilter/SelectedConceptFilterProvider.service';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-concept-filter-table',
  templateUrl: './concept-filter-table.component.html',
  styleUrls: ['./concept-filter-table.component.scss'],
})
export class ConceptFilterTableComponent implements OnInit, OnDestroy {
  codeableConceptResultList: CodeableConceptResultList;

  adaptedData: TableData;

  selectedConcepts: TerminologyCode[] = [];

  private subscription: Subscription = new Subscription();

  private subscription2: Subscription = new Subscription();

  constructor(
    private conceptElasticSearchService: ConceptElasticSearchService,
    private selectedConceptProviderService: SelectedConceptFilterProviderService
  ) {}

  ngOnInit() {
    this.subscription2 = this.conceptElasticSearchService
      .getCurrentSearchResults()
      .subscribe((results) => {
        this.adaptedData = this.conceptElasticSearchService.adaptListItems(results);
      });

    this.subscription = this.selectedConceptProviderService.getSelectedConcepts().subscribe(() => {
      this.updateCheckboxSelection();
    });
  }

  private updateCheckboxSelection(): void {
    this.adaptedData.body.rows.forEach((row) => {
      const listEntry = row.originalEntry as CodeableConceptResultListEntry;
      const termCode = this.createTerminologyCode(listEntry.getTerminologyCode());
      row.isCheckboxSelected = this.selectedConceptProviderService.findConcept(termCode)
        ? true
        : false;
    });
  }

  ngOnDestroy() {
    this.subscription2?.unsubscribe();
    this.subscription?.unsubscribe();
  }

  public addSelectedRow(item: InterfaceTableDataRow) {
    const entry = item.originalEntry as CodeableConceptResultListEntry;
    const terminologyCode = this.createTerminologyCode(entry.getTerminologyCode());
    this.selectedConcepts.push(terminologyCode);
  }

  public addSelectedConceptsToStage() {
    this.selectedConceptProviderService.addConcepts(this.selectedConcepts);
    this.selectedConcepts = [];
  }

  private createTerminologyCode(codeableConcept: TerminologyCode): TerminologyCode {
    return new TerminologyCode(
      codeableConcept.getCode(),
      codeableConcept.getDisplay(),
      codeableConcept.getSystem(),
      codeableConcept.getVersion()
    );
  }
}
