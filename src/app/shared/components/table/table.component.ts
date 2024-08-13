import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';

@Component({
  selector: 'num-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input()
  tableData: TableData;

  @Output()
  selectedRow: EventEmitter<InterfaceTableDataRow> = new EventEmitter();

  @Output()
  rowClicked: EventEmitter<InterfaceTableDataRow> = new EventEmitter();

  columnsToDisplay: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  public onRowClick(row: InterfaceTableDataRow): void {
    this.rowClicked.emit(row);
  }

  public onCheckboxSelect(row: InterfaceTableDataRow): void {
    row.isCheckboxSelected = !row.isCheckboxSelected;
    this.selectedRow.emit(row);
  }
}
