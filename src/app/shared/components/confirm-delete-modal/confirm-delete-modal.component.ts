import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'num-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
})
export class ConfirmDeleteModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>) {}

  public cancel() {
    this.dialogRef.close(false);
  }

  public confirm() {
    this.dialogRef.close(true);
  }
}
