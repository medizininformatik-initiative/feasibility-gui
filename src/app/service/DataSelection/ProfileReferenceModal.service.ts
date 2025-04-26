import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileReferenceModalComponent } from 'src/app/modules/query-editor/components/editor-content/profile/reference/modal-window/profile-reference-modal.component';
import { Observable, Subscription } from 'rxjs';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

@Injectable({
  providedIn: 'root',
})
export class ProfileReferenceModalService implements OnDestroy {
  dialogSubscription: Subscription;

  constructor(private dialog: MatDialog) {}

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }

  public openProfileReferenceModal(profileIds: TreeNode[]): Observable<any> {
    const dialogRef = this.dialog.open(ProfileReferenceModalComponent, {
      disableClose: true,
      data: profileIds,
    });

    return dialogRef.afterClosed();
  }
}
