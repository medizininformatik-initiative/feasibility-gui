import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/ReferenceCriteriaListEntryAdapter';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SelectedTableItemsService } from '../../../../../../../service/ElasticSearch/SearchTermListItemService.service';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { TerminologyCode } from '../../../../../../../model/Terminology/TerminologyCode';

interface selectedItem {
  id: string
  termCode: TerminologyCode
}
@Component({
  selector: 'num-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss'],
  providers: [SelectedTableItemsService],
})
export class ReferenceComponent implements OnInit, OnDestroy {
  @Input()
  referenceFilterUri: string[] = [];

  @Input()
  attributeCode: TerminologyCode;

  listItems: ReferenceCriteriaListEntry[] = [];

  @Output()
  selectedReferenceIds = new EventEmitter<string[]>();

  private subscription: Subscription;

  adaptedData: TableData;

  isTableItemsSelected = false;

  arrayOfSelectedReferences: selectedItem[] = [];

  constructor(
    private elasticSearchService: SearchService,
    private searchResultProviderService: SearchResultProvider,
    private selectedTableItemsService: SelectedTableItemsService<ReferenceCriteriaListEntry>
  ) {}

  ngOnInit() {
    this.subscription = this.searchResultProviderService
      .getCriteriaSetSearchResults()
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
    this.adaptedData?.body.rows.forEach((item) => {
      if (item.isCheckboxSelected) {
        this.uncheckRow(item);
      }
    });
  }
  private uncheckRow(item: InterfaceTableDataRow): void {
    item.isCheckboxSelected = false;
  }

  startElasticSearch(searchtext: string) {
    if (this.referenceFilterUri?.length > 0) {
      this.elasticSearchService
        .searchCriteriaSets(searchtext, this.referenceFilterUri)
        .subscribe((test) => {
          console.log(test);
          this.listItems = test.results;
        });
    } else {
      console.warn('No referenceCriteriaUrl was provided');
    }
  }

  setSelectedReferenceCriteria() {
    const ids = this.selectedTableItemsService.getSelectedIds();
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
