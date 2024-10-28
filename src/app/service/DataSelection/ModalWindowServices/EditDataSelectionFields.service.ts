import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditFieldsModalComponent } from 'src/app/modules/data-selection/components/editor/edit-fields-modal/edit-fields-modal.component';

@Injectable({
  providedIn: 'root',
})
export class EditDataSelectionFields implements OnDestroy {
  dialogSubscription: Subscription;

  constructor(private dialog: MatDialog) {}

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  public ediDataSelectionFields(url: string) {
    const dialogRef = this.dialog.open(EditFieldsModalComponent, {
      data: url,
    });

    dialogRef.afterClosed().subscribe();
  }
}
