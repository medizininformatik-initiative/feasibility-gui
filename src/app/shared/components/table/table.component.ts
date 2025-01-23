import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

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

  public unselectCheckbox(ids: string[]) {
    ids.forEach((id) => {
      const foundRow = this.tableData.body.rows.find((row) => row.id === id);
      if (foundRow && foundRow.isCheckboxSelected) {
        foundRow.isCheckboxSelected = false;
      }
    });
  }

  public isDisplayData(cell: any): boolean {
    return cell && cell instanceof DisplayData;
  }
}
