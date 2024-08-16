import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

export class EnterDataSelectionProfileProfileComponentData {
  dataSelectionProfile: DataSelectionProfileProfileNode;
}

@Component({
  selector: 'num-edit-fields-modal',
  templateUrl: './edit-fields-modal.component.html',
  styleUrls: ['./edit-fields-modal.component.scss'],
})
export class EditFieldsModalComponent implements OnInit {
  dataSelectionProfileProfileNode: DataSelectionProfileProfileNode[];

  tree: TreeNode;

  arrayOfSelectedFields: DataSelectionProfileProfileNode[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataSelectionProfileProfileNode[],
    private dialogRef: MatDialogRef<
      EnterDataSelectionProfileProfileComponentData,
      DataSelectionProfileProfileNode[]
    >
  ) {}

  ngOnInit() {
    this.dataSelectionProfileProfileNode = this.data;
    this.tree = FieldsTreeAdapter.fromTree(this.dataSelectionProfileProfileNode[0]);
  }

  public setSelectedFieldElement(element) {
    const node = this.getNodeFromElement(element);
    const index = this.getIndexInSelectedFields(node);
    if (this.isNodeSelected(index)) {
      this.removeNodeFromSelectedFields(index);
    } else {
      this.addNodeToSelectedFields(node);
      this.setFieldAsSeleced(node);
    }
  }

  public setFieldAsRequired(field: DataSelectionProfileProfileNode) {
    field.setIsRequired(!field.getIsRequired());
  }

  private getNodeFromElement(element): DataSelectionProfileProfileNode {
    return element.originalEntry;
  }

  private getIndexInSelectedFields(node: DataSelectionProfileProfileNode): number {
    return this.arrayOfSelectedFields.findIndex((field) => node.getId() === field.getId());
  }

  private isNodeSelected(index: number): boolean {
    return index !== -1;
  }

  private addNodeToSelectedFields(node: DataSelectionProfileProfileNode): void {
    this.arrayOfSelectedFields.push(node);
  }

  private setFieldAsSeleced(field: DataSelectionProfileProfileNode) {
    field.setIsSelected(!field.getIsSelected());
  }

  private removeNodeFromSelectedFields(index: number): void {
    this.arrayOfSelectedFields.splice(index, 1);
  }

  public saveFields() {
    this.dialogRef.close(this.arrayOfSelectedFields);
  }
  public closeDialog() {
    this.dialogRef.close();
  }
}
