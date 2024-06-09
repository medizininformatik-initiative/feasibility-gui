import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListEntry';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit, OnChanges {
  @Input() searchTermResultList: SearchTermListEntry[] = [];

  @Input() keysToSkip: Array<string> = [];

  columnsToDisplay: Array<string> = [];

  selectedRow: SearchTermListEntry;

  constructor(private listItemService: SearchResultListItemSelectionService) {}

  ngOnInit(): void {
    this.extractKeys(this.searchTermResultList, this.keysToSkip);
  }

  /**
   * Reads the data and creates a list of columns based of the keys provided
   *
   * @param data
   */
  private extractKeys(searchTermResultList: SearchTermListEntry[], keysToSkip: string[]) {
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

  ngOnChanges(): void {}

  /**
   * Sets the selected row for the detail view of list item
   *
   * @param row
   */
  public onRowSelect(rowData: SearchTermListEntry) {
    this.listItemService.setSelectedSearchResultListItem(rowData);
  }

  public isSelected(listItem: SearchTermListEntry): boolean {
    let isSelected = false;
    const itemId = listItem.id;
    this.listItemService.getSelectedSearchResultListItems().subscribe((selection) => {
      isSelected = selection.some(
        (selectedItem) => selectedItem.id === itemId && selectedItem.getSelectable()
      );
    });
    return isSelected;
  }

  public selectCheckbox(event, searchTermListItem: SearchTermListEntry) {
    if (event.checked) {
      this.listItemService.addSearchResultListItemToSelection(searchTermListItem);
    } else {
      this.listItemService.removeSearchResultListItemFromSelection(searchTermListItem);
    }
  }
}
