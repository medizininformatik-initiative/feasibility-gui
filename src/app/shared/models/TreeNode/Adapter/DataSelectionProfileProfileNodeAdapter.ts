import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { TreeNode } from '../TreeNodeInterface';

export class FieldsTreeAdapter {
  static fromTree(tree: DataSelectionProfileProfileNode): TreeNode {
    return FieldsTreeAdapter.toTreeNode(tree);
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
