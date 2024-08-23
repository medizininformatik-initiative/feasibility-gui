import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConceptElasticSearchService } from '../../../service/ConceptFilter/ConceptElasticSearch.service';
import { ConceptFilterProviderService } from '../../../service/ConceptFilter/ConceptFilterProvider.service';
import { InterfaceListEntry } from 'src/app/shared/models/ListEntries/InterfaceListEntry';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { Subscription } from 'rxjs';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-concept-filter-table',
  templateUrl: './concept-filter-table.component.html',
  styleUrls: ['./concept-filter-table.component.scss'],
})
export class ConceptFilterTableComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent) tableComponent: TableComponent;

  adaptedData: TableData;
  selectedRows: InterfaceTableDataRow[] = [];

  selectedConcepts: TerminologyCode[] = [];

  tableDataRowIds: string[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private conceptElasticSearchService: ConceptElasticSearchService,
    private conceptService: ConceptFilterProviderService
  ) {}

  ngOnInit() {
    this.subscription = this.conceptElasticSearchService
      .getCurrentSearchResults()
      .subscribe((entries: CodeableConceptResultList) => {
        console.log(entries);
        this.adaptedData = this.conceptElasticSearchService.adaptListItems(entries);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public setSelectedRow(item: InterfaceTableDataRow) {
    this.tableDataRowIds.push(item.id);
    this.stageConcepts(item.originalEntry);
  }

  private stageConcepts(originalEntry: InterfaceListEntry) {
    const entry = originalEntry as CodeableConceptResultListEntry;
    const terminologyCode = this.createTerminologyCode(entry.getTerminologyCode());
    this.selectedConcepts.push(terminologyCode);
  }

  public toggleIsSelected() {
    this.conceptService.addConcepts(this.selectedConcepts);
    //this.tableComponent.unselectCheckbox(this.tableDataRowIds);
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
