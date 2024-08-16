import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { EditFieldsModalComponent } from 'src/app/modules/data-selection/components/edit-fields-modal/edit-fields-modal.component';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FilterChipDataSelectionAdapter } from 'src/app/shared/models/FilterChips/Adapter/DataSelection/FilterChipDataSelectionAdapter';

@Injectable({
  providedIn: 'root',
})
export class EditDataSelectionFields implements OnDestroy {
  dialogSubscription: Subscription;

  constructor(private dialog: MatDialog) {}

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  public editCriterionAttribute(
    dataSelectionProfileProfileNode: DataSelectionProfileProfileNode[]
  ) {
    const dialogRef = this.dialog.open(EditFieldsModalComponent, {
      data: dataSelectionProfileProfileNode,
    });

    dialogRef.afterClosed().subscribe((selectedDataSelectionProfileNodeFields) => {
      if (selectedDataSelectionProfileNodeFields) {
        console.log(selectedDataSelectionProfileNodeFields);
        FilterChipDataSelectionAdapter.adaptFields(selectedDataSelectionProfileNodeFields[0]);
      }
    });
  }
}
