import { Component, OnInit } from '@angular/core';
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

  constructor(private profileTreeService: DataSelectionProfileTreeService) {}

  ngOnInit(): void {
    this.getTree();
  }

  getTree() {
    const tree = this.profileTreeService.createProfileTree();
    this.tree = DataSelectionTreeAdapter.fromTree(tree);
  }

  addItemsToStage(node: TreeNode) {
    console.log(node);
  }
}
