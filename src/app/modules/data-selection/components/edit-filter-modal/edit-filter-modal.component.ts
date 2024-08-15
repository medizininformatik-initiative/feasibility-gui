import { Component, Inject } from '@angular/core';
import { DataSelectionProviderService } from '../../services/DataSelectionProviderService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export class EnterDataSelectionProfileProfileComponentData {
  url: string;
}

@Component({
  selector: 'num-edit-filter-modal',
  templateUrl: './edit-filter-modal.component.html',
  styleUrls: ['./edit-filter-modal.component.scss'],
})
export class EditFilterModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private dataSelectionProvider: DataSelectionProviderService
  ) {}

  public closeDialog() {
    this.dialogRef.close();
  }
}
