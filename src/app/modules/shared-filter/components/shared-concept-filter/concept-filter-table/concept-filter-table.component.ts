import { CloneTerminologyCode } from 'src/app/model/Utilities/CriterionCloner/TerminologyCode/CloneTerminologyCode';
import { CodeableConceptListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptListEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
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

  @Input()
  valueSetUrl: string;

  @Input()
  attributeCode: TerminologyCode;

  adaptedData: TableData;

  selectedConcepts: TerminologyCode[] = [];

  private subscription: Subscription = new Subscription();

  private subscription2: Subscription = new Subscription();

  constructor(
    private conceptElasticSearchService: SearchResultProvider,
    private selectedConceptProviderService: SelectedConceptFilterProviderService
  ) {}

  ngOnInit() {
    console.log(this.attributeCode);
    this.subscription2 = this.conceptElasticSearchService
      .getCodeableConceptSearchResults(this.attributeCode.getCode())
      .subscribe((results) => {
        this.adaptedData = CodeableConceptListEntryAdapter.adapt(results.getResults());
      });

    this.subscription = this.selectedConceptProviderService.getSelectedConcepts().subscribe(() => {
      this.updateCheckboxSelection();
    });
  }

  private updateCheckboxSelection(): void {
    this.adaptedData?.body.rows.forEach((row) => {
      const listEntry = row.originalEntry as CodeableConceptResultListEntry;
      const terminologyCode = CloneTerminologyCode.deepCopyTerminologyCode(
        listEntry.getTerminologyCode()
      );
      this.clearSelectedConceptArray();
      row.isCheckboxSelected = this.selectedConceptProviderService.findConcept(terminologyCode)
        ? true
        : false;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  public addSelectedRow(item: InterfaceTableDataRow) {
    const entry = item.originalEntry as CodeableConceptResultListEntry;
    const terminologyCode = CloneTerminologyCode.deepCopyTerminologyCode(entry.getTerminologyCode());
    if (this.selectedConceptProviderService.findConcept(terminologyCode)) {
      this.selectedConceptProviderService.removeConcept(terminologyCode);
      this.clearSelectedConceptArray();
    } else {
      this.selectedConcepts.push(terminologyCode);
    }
  }

  public addSelectedConceptsToStage() {
    this.selectedConceptProviderService.addConcepts(this.selectedConcepts);
    this.clearSelectedConceptArray();
  }

  private clearSelectedConceptArray() {
    this.selectedConcepts = [];
  }
}
