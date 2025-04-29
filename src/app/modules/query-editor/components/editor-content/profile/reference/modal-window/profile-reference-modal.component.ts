import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { ProfileReferenceAdapter } from 'src/app/shared/models/TreeNode/Adapter/ProfileReferenceAdapter';
export class ProfileReferenceModalComponentData {
  referenceUrls: string[];
  profileId: string;
}
@Component({
  selector: 'num-profile-reference-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-reference-modal.component.html',
  styleUrls: ['./profile-reference-modal.component.scss'],
})
export class ProfileReferenceModalComponent implements OnInit {
  urlTree: TreeNode[] = [];

  selectedProfileIds: TreeNode[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProfileReferenceModalComponentData,
    private dialogRef: MatDialogRef<ProfileReferenceModalComponentData, TreeNode[]>
  ) {}

  ngOnInit(): void {
    this.initializeUrlTree();
  }

  private initializeUrlTree(): void {
    this.urlTree = ProfileReferenceAdapter.adapt(this.data.referenceUrls);
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public setSelectedReferenceFields(selectedProfile: TreeNode) {
    this.selectedProfileIds.push(selectedProfile);
  }

  public saveProfileReferences() {
    const urls = this.selectedProfileIds.map((node) => node.originalEntry);
    this.dialogRef.close(urls);
  }
}
