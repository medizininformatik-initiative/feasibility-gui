import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SearchTermListItem } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListItem';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit, OnChanges {
  @Input() searchTermResultList: SearchTermListItem[] = [];

  @Input() keysToSkip: Array<string> = [];

  /**
   * Columns to be rendered in the header and data rows
   *
   * @see {@link https://v15.material.angular.io/components/table/overview}
   */
  columnsToDisplay: Array<string> = [];

  selectedRow: SearchTermListItem;

  constructor(private listItemService: SearchResultListItemSelectionService) {}

  ngOnInit(): void {
    this.extractKeys(this.searchTermResultList, this.keysToSkip);
    this.listItemService.getSelectedSearchResultListItem().subscribe((row) => {
      this.selectedRow = row;
    });
  }

  /**
   * Reads the data and creates a list of columns based of the keys provided
   *
   * @param data
   */
  extractKeys(searchTermResultList: SearchTermListItem[], keysToSkip: string[]) {
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
  onRowSelect(rowData: SearchTermListItem) {
    this.listItemService.setSelectedSearchResultListItem(rowData);
  }

  selectCheckbox(event, searchTermListItem: SearchTermListItem) {
    if (event.checked) {
      this.listItemService.addSearchResultListItemToSelection(searchTermListItem);
    } else {
      this.listItemService.removeSearchResultListItemFromSelection(searchTermListItem);
    }
  }
}
