import { ActiveSearchTermService } from 'src/app/service/Search/ActiveSearchTerm.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CriteriaSetSearchService } from 'src/app/service/Search/SearchTypes/CriteriaSet/CriteriaSetSearch.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { Observable, Subscription } from 'rxjs';
import { ReferenceCriteriaListEntry } from 'src/app/model/Search/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/ReferenceCriteriaListEntryAdapter';
import { SelectedTableItemsService } from 'src/app/service/SearchTermListItemService.service';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

interface selectedItem {
  id: string
  display: Display
  system: string
  terminology: string
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
    private activeSearchTermService: ActiveSearchTermService,
    private searchService: CriteriaSetSearchService,
    private selectedTableItemsService: SelectedTableItemsService<ReferenceCriteriaListEntry>
  ) {}

  ngOnInit() {
    this.startElasticSearch('');
    this.subscription = this.searchService
      .getSearchResults([this.referenceFilterUri])
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.getResults();
          this.adaptedData = ReferenceCriteriaListEntryAdapter.adapt(this.listItems);
          if (this.adaptedData.body.rows.length > 0) {
            this.searchResultsFound = true;
          } else {
            this.searchResultsFound = false;
          }
        }
      });
    this.searchText$ = this.activeSearchTermService.getActiveSearchTerm();
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

  public startElasticSearch(searchtext: string) {
    if (this.referenceFilterUri?.length > 0) {
      this.searchService.search(searchtext, [this.referenceFilterUri]).subscribe((test) => {
        this.listItems = test.getResults();
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
        items.forEach((item: ReferenceCriteriaListEntry) => {
          this.arrayOfSelectedReferences.push({
            id: item.getId(),
            display: item.getDisplay(),
            system: item.getSystem(),
            terminology: item.getTerminology(),
          });
        });
      })
      .unsubscribe();

    this.emitIDs();
    this.selectedTableItemsService.clearSelection();
  }

  public setSelectedRowItem(item: InterfaceTableDataRow) {
    const selectedIds = this.selectedTableItemsService.getSelectedIds();
    const itemId = item.originalEntry.getId();
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
