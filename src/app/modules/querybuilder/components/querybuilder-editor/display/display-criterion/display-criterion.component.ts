import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { EditSingleCriterionComponent } from '../../edit/edit-single-criterion/edit-single-criterion.component'
import { Query } from '../../../../model/api/query/query'

@Component({
  selector: 'num-display-criterion',
  templateUrl: './display-criterion.component.html',
  styleUrls: ['./display-criterion.component.scss'],
})
export class DisplayCriterionComponent implements OnInit {
  @Input()
  criterion: Criterion

  @Input()
  query: Query

  @Output()
  delete = new EventEmitter<Criterion>()

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDetailsPopUp(): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      criterion: this.criterion,
      query: this.query,
    }

    this.dialog.open(EditSingleCriterionComponent, dialogConfig)
  }

  doDelete(): void {
    this.delete.emit(this.criterion)
  }
}
