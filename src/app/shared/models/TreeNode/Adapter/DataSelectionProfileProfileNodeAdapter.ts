import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { TreeNode } from '../TreeNodeInterface';

export class FieldsTreeAdapter {
  static fromTree(trees: DataSelectionProfileProfileNode[]): TreeNode[] {
    const result = [];
    trees.forEach((tree) => {
      result.push(FieldsTreeAdapter.toTreeNode(tree));
    });
    return result;
  }

  static toTreeNode(node: DataSelectionProfileProfileNode): TreeNode {
    return {
      id: node?.getId(),
      data: {
        name: node?.getName(),
        display: node?.getName() + ' (' + node?.getDisplay() + ')',
        selectable: true,
        isCheckboxSelected: node.getIsSelected(),
      },
      children: node?.getChildren()?.map((child: any) => FieldsTreeAdapter.toTreeNode(child)),
      originalEntry: node,
    };
  }
}
