import { Injectable } from '@angular/core';
import { EnterCriterionListComponent } from '../../modules/querybuilder/components/querybuilder-editor/edit/enter-criterion-list/enter-criterion-list.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { CritType } from '../../model/FeasibilityQuery/Group';
@Injectable({
  providedIn: 'root',
})
export class EditCriterionService {
  constructor(public dialog: MatDialog) {}

  public editCriterion(criterionList: Criterion[], critType: CritType): void {
    this.openDetailsPopUp(criterionList, critType);
  }

  private openDetailsPopUp(criterionList: Criterion[], critType: CritType): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      criterionList,
      groupIndex: 0,
      critType,
      searchType: 'querybuilder',
    };

    this.dialog.open(EnterCriterionListComponent, dialogConfig);
  }
}
