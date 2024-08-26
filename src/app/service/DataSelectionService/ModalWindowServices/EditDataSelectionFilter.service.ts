import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProviderService';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditFilterModalComponent } from 'src/app/modules/data-selection/components/edit-filter-modal/edit-filter-modal.component';

@Injectable({
  providedIn: 'root',
})
export class EditDataSelectionFilter implements OnDestroy {
  dialogSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private dataSelectionProvider: DataSelectionProviderService
  ) {}

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  public ediDataSelectionFilter(url: string) {
    const dialogRef = this.dialog.open(EditFilterModalComponent, {
      data: url,
    });

    dialogRef.afterClosed().subscribe();
  }
}