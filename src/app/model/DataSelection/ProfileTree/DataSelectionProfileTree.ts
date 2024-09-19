import { DataSelectionProfileTreeNode } from './DataSelectionProfileTreeNode';
import { DataSelectionProfileTreeRoot } from './DataSelectionProfileTreeRoot';

export class DataSelectionProfileTree {
  private treeRoot: DataSelectionProfileTreeRoot;
  private treeNode: DataSelectionProfileTreeNode[] = [];

  constructor(treeRoot: DataSelectionProfileTreeRoot, treeNode: DataSelectionProfileTreeNode[]) {
    this.treeRoot = treeRoot;
    this.treeNode = treeNode;
  }

  /**
   *
   * @returns
   */
  getTreeRoot(): DataSelectionProfileTreeRoot {
    return this.treeRoot;
  }

  /**
   *
   * @param treeRoot
   */
  setTreeRoot(treeRoot: DataSelectionProfileTreeRoot): void {
    this.treeRoot = treeRoot;
  }

  /**
   *
   * @returns
   */
  getTreeNode(): DataSelectionProfileTreeNode[] {
    return this.treeNode;
  }

  /**
   *
   * @param treeNode
   */
  setTreeNode(treeNode: DataSelectionProfileTreeNode[]): void {
    this.treeNode = treeNode;
  }
}
