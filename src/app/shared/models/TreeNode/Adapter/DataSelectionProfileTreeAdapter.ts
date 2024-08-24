import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { TreeNode } from '../TreeNodeInterface';

export class DataSelectionTreeAdapter {
  static fromTree(tree: DataSelectionProfileTreeNode[]): TreeNode[] {
    return DataSelectionTreeAdapter.toTreeNode(tree);
  }

  static toTreeNode(nodes: DataSelectionProfileTreeNode[]): TreeNode[] {
    const result = [];
    if (nodes) {
      nodes.forEach((node) => {
        result.push({
          id: node.id,
          data: {
            name: node.name,
            display: node.display,
            module: node.module,
            url: node.url,
            leaf: node.leaf,
            selectable: node.selectable,
          },
          children: DataSelectionTreeAdapter.toTreeNode(node?.children),
          originalEntry: node,
        });
      });
    }
    return result;
  }
}
