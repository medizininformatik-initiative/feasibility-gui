import { Injectable, OnDestroy } from '@angular/core';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from '../Provider/CriterionProvider.service';
import { EditCriterionModalComponent } from 'src/app/modules/querybuilder/components/querybuilder-editor/edit/edit-criterion-modal/edit-criterion-modal.component';
import { EditReferenceCriteriaModalComponent } from 'src/app/modules/querybuilder/components/querybuilder-editor/edit/edit-reference-criteria-modal/edit-reference-criteria-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AbstractCriterion } from 'src/app/model/FeasibilityQuery/Criterion/AbstractCriterion';
import { FeasibilityQueryProviderService } from '../Provider/FeasibilityQueryProvider.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionModalService implements OnDestroy {
  dialogSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private criterionProviderService: CriterionProviderService,
    private FeasibilityQueryProvider: FeasibilityQueryProviderService
  ) {}

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  public openCriterionModal(criterion: Criterion) {
    const dialogRef = this.dialog.open(EditCriterionModalComponent, {
      data: { criterion },
    });
    this.dialogSubscription = dialogRef
      .afterClosed()
      .subscribe((updatedCriterion: AbstractCriterion) => {
        if (updatedCriterion) {
          this.criterionProviderService.setCriterionByUID(
            updatedCriterion,
            updatedCriterion.getId()
          );
        }
      });
  }

  public openReferenceCriteriaModal(criterion: Criterion) {
    const dialogRef = this.dialog.open(EditReferenceCriteriaModalComponent, {
      data: { criterion },
    });
    this.dialogSubscription = dialogRef.afterClosed().subscribe((updatedCriterion: Criterion) => {
      if (updatedCriterion) {
        this.criterionProviderService.setCriterionByUID(updatedCriterion, updatedCriterion.getId());
      }
    });
  }
}
