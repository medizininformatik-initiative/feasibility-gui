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

  static toTreeNode(node: any): TreeNode {
    return {
      id: node?.id,
      data: {
        name: node?.name,
        display: node?.display,
      },
      children: node?.children?.map((child: any) => FieldsTreeAdapter.toTreeNode(child)),
      originalEntry: node,
    };
  }
}
