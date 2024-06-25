import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent<T extends InterfaceListEntry>
  implements OnInit, OnChanges, OnDestroy
{
  @Input() searchTermResultList: T[] = [];
  @Input() keysToSkip: string[] = [];

  columnsToDisplay: string[] = [];
  selectedRow: T | null = null;
  listItemServiceSubscription: Subscription;

  constructor(private listItemService: SearchResultListItemSelectionService<T>) {}

  ngOnInit(): void {
    this.extractKeys(this.searchTermResultList, this.keysToSkip);
  }

  private extractKeys(searchTermResultList: T[], keysToSkip: string[]): void {
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

  public onRowSelect(rowData: T): void {
    this.listItemService.setSelectedSearchResultListItem(rowData);
  }

  public isSelected(listItem: T): boolean {
    let isSelected = false;
    const itemId = listItem.id;
    this.listItemServiceSubscription = this.listItemService
      .getSelectedSearchResultListItems()
      .subscribe((selection) => {
        isSelected = selection.some(
          (selectedItem) =>
            selectedItem.id === itemId &&
            hasSelectable(selectedItem) &&
            selectedItem.getSelectable()
        );
      });
    return isSelected;
  }

  public selectCheckbox(event, searchTermListItem: T): void {
    if (event.checked) {
      this.listItemService.addSearchResultListItemToSelection(searchTermListItem);
    } else {
      this.listItemService.removeSearchResultListItemFromSelection(searchTermListItem);
    }
  }
}

const hasSelectable = (entry: any): entry is { getSelectable: () => boolean } => entry && typeof entry.getSelectable === 'function';
