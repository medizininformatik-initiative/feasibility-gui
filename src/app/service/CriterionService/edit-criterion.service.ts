import { Injectable } from '@angular/core';
import { EnterCriterionListComponent } from '../../modules/querybuilder/components/querybuilder-editor/edit/enter-criterion-list/enter-criterion-list.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { CritType } from '../../model/FeasibilityQuery/Group';
import { TerminologyEntry } from '../../model/terminology/Terminology';
import { CreateCriterionService } from './CreateCriterion.service';
import { CritGroupPosition } from '../../modules/querybuilder/controller/CritGroupArranger';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EditCriterionService {
  constructor(public dialog: MatDialog, private CriterionService: CreateCriterionService) {}

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
          observableBatch.push(this.CriterionService.createCriterionFromTermEntry(termEntry));
        });
        forkJoin(observableBatch).subscribe((critList) => {
          this.openDetailsPopUp(critList, 'create', critType, position);
        });
      } else {
        this.openDetailsPopUp(data, 'edit', critType, position);
      }
    } else {
      this.openDetailsPopUp([data], 'edit', critType, position);
    }
  }

  private openDetailsPopUp(
    criterionList: Criterion[],
    modus: string,
    critType: CritType,
    position?: CritGroupPosition
  ): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      criterionList,
      groupIndex: 0,
      critType,
      position,
      modus,
    };

    this.dialog.open(EnterCriterionListComponent, dialogConfig);
  }
}
