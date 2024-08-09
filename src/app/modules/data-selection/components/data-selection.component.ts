import { Component, OnInit } from '@angular/core';
import { CreateDataSelectionProfileProfile } from 'src/app/service/DataSelectionService/CreateDataSelectionProfileProfile.service';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  tree: TreeNode;

  selectedDataSelectionProfileNodeIds: Set<string> = new Set();

  constructor(
    private createDataSelectionProfileService: CreateDataSelectionProfileProfile,
    private dataSelectionProfileTreeService: DataSelectionProfileTreeService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProfileTreeService.createProfileTree().subscribe((tree) => {
      this.tree = DataSelectionTreeAdapter.fromTree(tree.getTreeNode());
    });
  }

  public addItemsToStage(node: TreeNode) {
    const nodeId: string = node.id;
    if (this.selectedDataSelectionProfileNodeIds.has(nodeId)) {
      this.selectedDataSelectionProfileNodeIds.delete(nodeId);
    } else {
      this.selectedDataSelectionProfileNodeIds.add(nodeId);
    }
  }

  public getDataSelectionProfileData() {
    this.createDataSelectionProfileService.getDataSelectionProfileProfileData().subscribe();
  }
}
