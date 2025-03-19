import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/ReferenceCriteriaListEntryAdapter';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SearchService } from 'src/app/service/Search/Search.service';
import { Observable, Subscription } from 'rxjs';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';

interface selectedItem {
  id: string
  display: Display
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
  referenceFilterUri: string;

  @Input()
  attributeCode: TerminologyCode;

  listItems: ReferenceCriteriaListEntry[] = [];

  @Output()
  selectedReferenceIds = new EventEmitter<string[]>();

  private subscription: Subscription;

  adaptedData: TableData;

  isTableItemsSelected = false;

  arrayOfSelectedReferences: selectedItem[] = [];

  searchText$: Observable<string>;

  searchResultsFound = false;

  constructor(
    private searchService: SearchService,
    private searchResultProviderService: SearchResultProvider,
    private selectedTableItemsService: SelectedTableItemsService<ReferenceCriteriaListEntry>
  ) {}

  ngOnInit() {
    this.startElasticSearch('');
    this.subscription = this.searchResultProviderService
      .getCriteriaSetSearchResults()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = ReferenceCriteriaListEntryAdapter.adapt(this.listItems);
          if (this.adaptedData.body.rows.length > 0) {
            this.searchResultsFound = true;
          } else {
            this.searchResultsFound = false;
          }
        }
      });
    this.searchText$ = this.searchService.getActiveSearchTerm();
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
      this.searchService
        .searchCriteriaSets(searchtext, this.referenceFilterUri)
        .subscribe((test) => {
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
            display: item.getDisplay(),
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
