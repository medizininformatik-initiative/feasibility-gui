import { CodeableConceptListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptListEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ConceptService } from '../../../service/ConceptFilter/ConceptFilter.service';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { StagedConceptService } from '../../../service/ConceptFilter/StagedConceptService .service';
import { ConceptElasticSearchService } from '../../../service/ConceptFilter/ConceptElasticSearchService.service';

@Component({
  selector: 'num-concept-filter-table',
  templateUrl: './concept-filter-table.component.html',
  styleUrls: ['./concept-filter-table.component.scss'],
  providers: [SelectedTableItemsService],
})
export class ConceptFilterTableComponent implements OnInit {
  @ViewChild(TableComponent)
  tableComponent: TableComponent;

  adaptedData: TableData;
  selectedRows: InterfaceTableDataRow[] = [];

  constructor(
    private selectedTableItemsService: SelectedTableItemsService<CodeableConceptResultListEntry>,
    private conceptElasticSearchService: ConceptElasticSearchService,
    private stagedConceptService: StagedConceptService,
    private conceptService: ConceptService
  ) {}

  ngOnInit() {
    this.adaptListEntriesToTableData();
  }

  public adaptListEntriesToTableData() {
    this.conceptElasticSearchService.getCurrentSearchResults().subscribe((entries) => {
      this.adaptedData = this.conceptElasticSearchService.adaptListItems(entries);
    });
  }

  public setSelectedRow(item: InterfaceTableDataRow) {
    const entry = item.originalEntry as CodeableConceptResultListEntry;
    this.selectedTableItemsService.setSelectedTableItem(entry);

    // Add the selected concept to the staging service
    const terminologyCode = this.createTerminologyCode(entry);
    this.stagedConceptService.addStagedConcept(terminologyCode);
  }

  public toggleIsSelected() {
    this.stagedConceptService.getStagedConcepts().subscribe((stagedConcepts) => {
      stagedConcepts.forEach((concept) => {
        this.conceptService.addConcept(concept);
      });
      this.stagedConceptService.clearStagedConcepts();
    });

    // Unselect all checkboxes in the table
    const selectedIds = this.selectedTableItemsService.getSelectedIds();
    this.tableComponent.unselectCheckbox(selectedIds);
    this.selectedTableItemsService.clearSelection();
  }

  private createTerminologyCode(codeableConcept: any): TerminologyCode {
    return new TerminologyCode(
      codeableConcept.getCode(),
      codeableConcept.getDisplay(),
      codeableConcept.getSystem(),
      codeableConcept.getVersion()
    );
  }
}
