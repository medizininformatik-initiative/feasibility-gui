import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeleteService {
  constructor(private dialog: MatDialog) {}

  public confirmDelete(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      disableClose: true,
    });
    return dialogRef.afterClosed();
  }
}
