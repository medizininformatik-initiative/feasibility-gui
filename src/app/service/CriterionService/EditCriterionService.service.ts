import { ApplicationRef, ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { EditCriterionModalComponent } from 'src/app/modules/querybuilder/components/querybuilder-editor-new-design/edit/edit-criterion-modal/edit-criterion-modal.component';
import { EditReferenceCriteriaModalComponent } from 'src/app/modules/querybuilder/components/querybuilder-editor-new-design/edit/edit-reference-criteria-modal/edit-reference-criteria-modal.component';
import { CriterionProviderService } from '../Provider/CriterionProvider.service';
import { StageProviderService } from '../Provider/StageProvider.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditCriterionService implements OnDestroy {
  dialogSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private criterionProviderService: CriterionProviderService
  ) {}

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  public editCriterionAttribute(criterion: Criterion) {
    const dialogRef = this.dialog.open(EditCriterionModalComponent, {
      data: { criterion },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe((updatedCriterion: Criterion) => {
      if (updatedCriterion) {
        this.criterionProviderService.setCriterionByUID(updatedCriterion);
      }
    });
  }

  public editCriterionReferenceCriteria(criterion: Criterion) {
    const dialogRef = this.dialog.open(EditReferenceCriteriaModalComponent, {
      data: { criterion },
    });
    this.dialogSubscription = dialogRef.afterClosed().subscribe();
  }
}
