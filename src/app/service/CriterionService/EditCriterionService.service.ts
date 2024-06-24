import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { CreateCriterionService } from './CreateCriterion.service';
//import { CritGroupPosition } from '../../modules/querybuilder/controller/CritGroupArranger';
import { EditCriterionModalComponent } from 'src/app/modules/querybuilder/components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-criterion-modal.component';
import { CritType } from 'src/app/modules/querybuilder/model/api/query/group';
@Injectable({
  providedIn: 'root',
})
export class EditCriterionService {
  constructor(public dialog: MatDialog, private CriterionService: CreateCriterionService) {}

  /*
  public editCriterion(
    data: TerminologyEntry | TerminologyEntry[] | Criterion | Criterion[],
    critType: CritType,
    position?: CritGroupPosition
  ): void {
    const criterionList: Criterion[] = [];
    const observableBatch = [];
    if (data instanceof Array) {
      if (data instanceof Array<TerminologyEntry>) {
        data.forEach((termEntry) => {
          observableBatch.push(this.CriterionService.createCriterionFromHashTermEntry(termEntry));
        });
        forkJoin(observableBatch).subscribe((critList) => {
          this.openDetailsPopUp(critList, 'ADD', critType, position);
        });
      } else {
        this.openDetailsPopUp(data, 'EDIT', critType, position);
      }
    } else {
      this.openDetailsPopUp([data], 'EDIT', critType, position);
    }
  }
    */

  public newEditCriterion(criterion) {
    const dialogRef = this.dialog.open(EditCriterionModalComponent, {
      data: { criterion },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  /*
  private openDetailsPopUp(
    criterionList: Criterion[],
    modus: string,
    critType: CritType,
    position?: CritGroupPosition
  ): void {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      criterionList,
      groupIndex: 0,
      critType,
      position,
      modus,
    }

    this.dialog.open(EnterCriterionListComponent, dialogConfig)
  }*/
}
