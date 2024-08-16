import { Component, OnInit } from '@angular/core';
import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { CreateDataSelectionProfileProfile } from 'src/app/service/DataSelectionService/CreateDataSelectionProfileProfile.service';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';

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

  public getDataSelectionProfileData() {
    const dataSelectionProfileUrls = Array.from(this.selectedDataSelectionProfileNodeIds);
    this.createDataSelectionProfileService
      .getDataSelectionProfileProfileData(dataSelectionProfileUrls)
      .subscribe();
  }

  public addItemsToStage(node: TreeNode) {
    const originalEntry: DataSelectionProfileTreeNode =
      node.originalEntry as DataSelectionProfileTreeNode;
    if (this.selectedDataSelectionProfileNodeIds.has(originalEntry.url)) {
      this.selectedDataSelectionProfileNodeIds.delete(originalEntry.url);
    } else {
      this.selectedDataSelectionProfileNodeIds.add(originalEntry.url);
    }
  }
}
