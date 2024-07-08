import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent<T extends InterfaceListEntry>
  implements OnInit, OnChanges, OnDestroy
{
  @Input()
  tableData: TableData;

  @Output()
  selectedRow: EventEmitter<InterfaceTableDataRow> = new EventEmitter();

  @Output()
  rowClicked: EventEmitter<InterfaceTableDataRow> = new EventEmitter();

  columnsToDisplay: string[] = [];
  listItemServiceSubscription: Subscription;

  constructor(private tableItemService: SelectedTableItemsService<InterfaceListEntry>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.listItemServiceSubscription) {
      this.listItemServiceSubscription.unsubscribe();
    }
  }

  ngOnChanges(): void {}

  public onRowClick(row: InterfaceTableDataRow): void {
    this.rowClicked.emit(row);
  }

  public isSelected(listItem: T): boolean {
    let isSelected = false;
    const itemId = listItem.id;
    this.listItemServiceSubscription = this.tableItemService
      .getSelectedTableItems()
      .subscribe((selection) => {
        isSelected = selection.some(
          (selectedItem) =>
            selectedItem.id === itemId &&
            (hasSelectable(selectedItem) ? selectedItem.getSelectable() : true)
        );
      });
    return isSelected;
  }

  public onCheckboxSelect(row: InterfaceTableDataRow): void {
    this.selectedRow.emit(row);
  }
}

const hasSelectable = (entry: any): entry is { getSelectable: () => boolean } =>
  entry && typeof entry.getSelectable === 'function';
