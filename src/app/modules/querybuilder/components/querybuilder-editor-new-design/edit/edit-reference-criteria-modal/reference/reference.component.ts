import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CreateCriterionService } from 'src/app/service/CriterionService/CreateCriterion.service';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/ReferenceCriteriaListEntryAdapter';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { ReferenceFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { SelectedTableItemsService } from '../../../../../../../service/ElasticSearch/SearchTermListItemService.service';
import { SearchTermListEntry } from '../../../../../../../shared/models/ListEntries/SearchTermListEntry';
import { TerminologyCode } from '../../../../../../../model/Terminology/TerminologyCode';

interface selectedItem {
  id: string
  termCode: TerminologyCode
}
@Component({
  selector: 'num-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent implements OnInit, OnDestroy {
  @Input()
  referenceFilter: ReferenceFilter;

  @Input()
  listItems: ReferenceCriteriaListEntry[] = [];

  @Output()
  selectedReferenceIds = new EventEmitter<string[]>();

  private subscription: Subscription;

  adaptedData: TableData;

  searchtext = '';
  isTableItemsSelected = false;

  arrayOfSelectedReferences: selectedItem[] = [];

  constructor(
    private elasticSearchService: ElasticSearchService<
      ReferenceCriteriaResultList,
      ReferenceCriteriaListEntry
    >,
    private selectedTableItemsService: SelectedTableItemsService<ReferenceCriteriaListEntry>
  ) {}

  ngOnInit() {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = ReferenceCriteriaListEntryAdapter.adapt(this.listItems);
        }
      });
    this.handleSelectedItemsSubscription();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private handleSelectedItemsSubscription(): void {
    this.selectedTableItemsService
      .getSelectedTableItems()
      .subscribe((selectedItems: ReferenceCriteriaListEntry[]) => {
        if (this.shouldUncheckAll(selectedItems)) {
          this.isTableItemsSelected = false;
          this.uncheckAllRows();
        } else {
          this.isTableItemsSelected = true;
        }
      });
  }
  private shouldUncheckAll(selectedItems: ReferenceCriteriaListEntry[]): boolean {
    return selectedItems.length === 0;
  }

  private uncheckAllRows(): void {
    this.adaptedData.body.rows.forEach((item) => {
      if (item.isCheckboxSelected) {
        this.uncheckRow(item);
      }
    });
  }
  private uncheckRow(item: InterfaceTableDataRow): void {
    item.isCheckboxSelected = false;
  }

  /*private initializeArrayOfReferenceCriterions() {
    if (this.referenceFilter && this.referenceFilter.getSelectedReferences()) {
      this.referenceFilter.getSelectedReferences().forEach((referenceCriterion) => {
        this.arrayOfSelectedReferences.push(referenceCriterion);
      });
    }
  }*/

  startElasticSearch(searchtext: string) {
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      const allowedReferenceUri = this.referenceFilter.getAllowedReferenceUri();
      this.elasticSearchService
        .startElasticSearch(searchtext, [], allowedReferenceUri)
        .subscribe((test) => {
          this.listItems = test.results;
        });
    }
  }

  setSelectedReferenceCriteria() {
    const ids = this.selectedTableItemsService.getSelectedIds();
    //const ids = this.selectedListEntries.map((selectedListEntry) => selectedListEntry.id);
    //this.selectedReferenceIds.emit(ids);
    this.selectedTableItemsService
      .getSelectedTableItems()
      .subscribe((items) => {
        items.forEach((item) => {
          this.arrayOfSelectedReferences.push({
            id: item.getId(),
            termCode: item.getTerminologyCode(),
          });
        });
      })
      .unsubscribe();

    this.emitIDs();
    this.selectedTableItemsService.clearSelection();
  }

  public setSelectedRowItem(item: InterfaceTableDataRow) {
    const selectedIds = this.selectedTableItemsService.getSelectedIds();
    const itemId = item.originalEntry.id;
    if (selectedIds.includes(itemId)) {
      this.selectedTableItemsService.removeFromSelection(
        item.originalEntry as ReferenceCriteriaListEntry
      );
    } else {
      this.selectedTableItemsService.setSelectedTableItem(
        item.originalEntry as ReferenceCriteriaListEntry
      );
    }
  }

  public removeSelectedReference(index: number): void {
    this.arrayOfSelectedReferences.splice(index, 1);
    this.emitIDs();
  }

  private emitIDs(): void {
    this.selectedReferenceIds.emit(this.arrayOfSelectedReferences.map((items) => items.id));
  }
}
