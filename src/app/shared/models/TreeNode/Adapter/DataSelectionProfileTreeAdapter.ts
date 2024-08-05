import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { TreeNode } from '../TreeNodeInterface';
import { DataSelectionProfileTree } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTree';

export class DataSelectionTreeAdapter {
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
      children: node.children.map((child) => DataSelectionTreeAdapter.toTreeNode(child)),
    };
  }

  static fromTree(tree: DataSelectionProfileTree): TreeNode {
    const root = tree.getTreeRoot();
    return {
      id: 'root',
      data: {
        name: root.getName(),
        module: root.getModule(),
        url: root.getUrl(),
      },
      children: root.getChildren().map((child) => DataSelectionTreeAdapter.toTreeNode(child)),
    };
  }
}
