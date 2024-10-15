import { DataSelectionProfileTreeNode } from 'src/app/model/DataSelection/ProfileTree/DataSelectionProfileTreeNode';
import { TreeNode } from '../TreeNodeInterface';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

export class DataSelectionTreeAdapter {
  static fromTree(tree: DataSelectionProfileTreeNode[], curLang: string): TreeNode[] {
    return DataSelectionTreeAdapter.toTreeNode(tree, curLang);
  }

  static toTreeNode(nodes: DataSelectionProfileTreeNode[], curLang: string): TreeNode[] {
    const result = [];
    if (nodes) {
      nodes.forEach((node) => {
        const display = new DisplayData(
          node?.getDisplay().original,
          node?.getDisplay().translations
        ).getTranslation(curLang);

        result.push({
          id: node.getId(),
          data: {
            name: node.getName(),
            display,
            module: node.getModule(),
            url: node.getUrl(),
            leaf: node.getLeaf(),
            selectable: node.getSelectable(),
            isCheckboxSelected: false,
          },
          children: DataSelectionTreeAdapter.toTreeNode(node.getChildren(), curLang),
          originalEntry: node,
        });
      });
    }
    return result;
  }
}
