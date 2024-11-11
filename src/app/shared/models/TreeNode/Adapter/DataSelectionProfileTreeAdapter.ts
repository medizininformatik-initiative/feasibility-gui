import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { TreeNode } from '../TreeNodeInterface';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

export class DataSelectionTreeAdapter {
  static fromTree(tree: DataSelectionProfileTreeNode[]): TreeNode[] {
    return DataSelectionTreeAdapter.toTreeNode(tree);
  }

  static toTreeNode(nodes: DataSelectionProfileTreeNode[]): TreeNode[] {
    const result = [];
    if (nodes) {
      nodes.forEach((node) => {
        result.push({
          id: node.getId(),
          data: {
            name: node.getName(),
            display: node.getDisplay(),
            displayFieldsInfo: node.getDisplayFieldsInfo(),
            module: node.getModule(),
            url: node.getUrl(),
            leaf: node.getLeaf(),
            selectable: node.getSelectable(),
            isCheckboxSelected: false,
            isDisabled: node.getSelectable(),
          },
          children: DataSelectionTreeAdapter.toTreeNode(node.getChildren()),
          originalEntry: node,
        });
      });
    }
    return result;
  }
}
