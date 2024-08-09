import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { TreeNode } from '../TreeNodeInterface';

export class DataSelectionTreeAdapter {
  static fromTree(tree: DataSelectionProfileTreeNode[]): TreeNode {
    return DataSelectionTreeAdapter.toTreeNode(tree[0]);
  }

  static toTreeNode(node: DataSelectionProfileTreeNode): TreeNode {
    return {
      id: node.id,
      data: {
        name: node.name,
        display: node.display,
        module: node.module,
        url: node.url,
        leaf: node.leaf,
        selectable: node.selectable,
      },
      children: node.children?.map((child) => DataSelectionTreeAdapter.toTreeNode(child)),
    };
  }
}
