import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListEntry';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() searchTermResultList: SearchTermListEntry[] = [];
  @Input() keysToSkip: Array<string> = [];

  columnsToDisplay: Array<string> = [];
  selectedRow: SearchTermListEntry;
  listItemServiceSubscription: Subscription;

  constructor(private listItemService: SearchResultListItemSelectionService) {}

  ngOnInit(): void {
    this.extractKeys(this.searchTermResultList, this.keysToSkip);
  }

  /**
   * Reads the data and creates a list of columns based on the keys provided
   *
   * @param searchTermResultList
   * @param keysToSkip
   */
  private extractKeys(searchTermResultList: SearchTermListEntry[], keysToSkip: string[]): void {
    if (!searchTermResultList || searchTermResultList.length === 0) {
      return;
    }

    const keys = Object.keys(searchTermResultList[0]);
    keys.forEach((key) => {
      if (!keysToSkip.includes(key)) {
        this.columnsToDisplay.push(key);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.listItemServiceSubscription) {
      this.listItemServiceSubscription.unsubscribe();
    }
  }

  ngOnChanges(): void {}

  /**
   * Sets the selected row for the detail view of list item
   *
   * @param rowData
   */
  public onRowSelect(rowData: SearchTermListEntry): void {
    this.listItemService.setSelectedSearchResultListItem(rowData);
  }

  public isSelected(listItem: SearchTermListEntry): boolean {
    let isSelected = false;
    const itemId = listItem.id;
    this.listItemServiceSubscription = this.listItemService
      .getSelectedSearchResultListItems()
      .subscribe((selection) => {
        isSelected = selection.some(
          (selectedItem) => selectedItem.id === itemId && selectedItem.getSelectable()
        );
      });
    return isSelected;
  }

  public selectCheckbox(event, searchTermListItem: SearchTermListEntry): void {
    if (event.checked) {
      this.listItemService.addSearchResultListItemToSelection(searchTermListItem);
    } else {
      this.listItemService.removeSearchResultListItemFromSelection(searchTermListItem);
    }
  }
}
