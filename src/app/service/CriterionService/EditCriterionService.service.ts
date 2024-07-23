import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { EditCriterionModalComponent } from 'src/app/modules/querybuilder/components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-criterion-modal.component';
import { EditReferenceCriteriaModalComponent } from 'src/app/modules/querybuilder/components/querybuilder-editor-new-design/edit/edit-reference-criteria-modal/edit-reference-criteria-modal.component';
import { CriterionService } from '../CriterionService.service';

@Injectable({
  providedIn: 'root',
})
export class EditCriterionService {
  constructor(public dialog: MatDialog, private criterionService: CriterionService) {}

  public editCriterionAttribute(criterion: Criterion) {
    const dialogRef = this.dialog.open(EditCriterionModalComponent, {
      data: { criterion },
    });

    dialogRef.afterClosed().subscribe((updatedCriterion: Criterion) => {
      if (updatedCriterion) {
        this.criterionService.setCriterionByUID(updatedCriterion);
      }
    });
  }

  public editCriterionReferenceCriteria(criterion: Criterion) {
    const dialogRef = this.dialog.open(EditReferenceCriteriaModalComponent, {
      data: { criterion },
    });

    dialogRef.afterClosed().subscribe();
  }
}
