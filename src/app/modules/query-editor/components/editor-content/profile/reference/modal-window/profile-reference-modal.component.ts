import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
export class ProfileReferenceModalComponentData {
  profileIds: TreeNode[];
}
@Component({
  selector: 'num-profile-reference-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-reference-modal.component.html',
  styleUrls: ['./profile-reference-modal.component.scss'],
})
export class ProfileReferenceModalComponent implements OnInit {
  selectedProfileIds: TreeNode[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public profileIds: TreeNode[],
    private dialogRef: MatDialogRef<ProfileReferenceModalComponentData, TreeNode[]>
  ) {}

  ngOnInit(): void {}

  public closeDialog() {
    this.dialogRef.close();
  }

  public setSelectedReferenceFields(selectedProfile: TreeNode) {
    this.selectedProfileIds.push(selectedProfile);
  }

  public saveProfileReferences() {
    this.dialogRef.close(this.selectedProfileIds);
  }
}
