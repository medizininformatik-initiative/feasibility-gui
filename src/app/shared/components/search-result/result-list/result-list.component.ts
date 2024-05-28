import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SearchTermListItemService } from 'src/app/service/SearchTermListItemService.service';

@Component({
  selector: 'num-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit, OnChanges {
  @Input() searchTermResultList: any[] = [];

  /**
   * Columns to be rendered in the header and data rows
   *
   * @see {@link https://v15.material.angular.io/components/table/overview}
   */
  columnsToDisplay: Array<string> = [];

  selectedRow: any = null;

  constructor(private listItemService: SearchTermListItemService) {}

  ngOnInit(): void {
    this.extractKeys(this.searchTermResultList);
    this.listItemService.getSelectedRow().subscribe((row) => {
      this.selectedRow = row;
    });
  }

  /**
   * Reads the data and creates a list of columns based of the keys provided
   *
   * @param data
   */
  extractKeys(data: any) {
    const keys = Object.keys(data[0]);
    keys.forEach((key) => this.columnsToDisplay.push(key));
  }

  ngOnChanges(): void {}

  /**
   * Sets the selected row for the detail view of list item
   *
   * @param row
   */
  onRowSelect(row: any) {
    this.listItemService.setSelectedRow(row);
  }

  selectCheckbox(event) {
    this.listItemService.setSelectedRow(event);
  }
}
