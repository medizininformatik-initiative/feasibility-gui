import { Component, OnInit } from '@angular/core';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DataSelectionProviderService } from '../services/DataSelectionProviderService';
import { CreateDataSelectionProfileProfile } from 'src/app/service/DataSelectionService/CreateDataSelectionProfileProfile.service';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  tree: TreeNode;

  selectedDataSelectionProfileNodeIds: Set<string> = new Set();

  constructor(
    private profileTreeService: DataSelectionProfileTreeService,
    private createDataSelectionProfileService: CreateDataSelectionProfileProfile
  ) {}

  ngOnInit(): void {
    this.getTree();
  }

  getTree() {
    const tree = this.profileTreeService.createProfileTree();
    this.tree = DataSelectionTreeAdapter.fromTree(tree);
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
