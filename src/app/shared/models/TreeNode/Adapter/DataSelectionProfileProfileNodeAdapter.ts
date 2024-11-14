import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { TreeNode } from '../TreeNodeInterface';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

export class FieldsTreeAdapter {
  static fromTree(trees: ProfileFields[]): TreeNode[] {
    const result = [];
    trees.forEach((tree) => {
      result.push(FieldsTreeAdapter.toTreeNode(tree));
    });
    return result;
  }

  static toTreeNode(node: ProfileFields): TreeNode {
    return {
      id: node?.getId(),
      data: {
        name: node.getDisplay(),
        display: node.getDisplay(),
        description: node.getDescription(),
        selectable: true,
        isCheckboxSelected: node.getIsSelected() || node.getIsRequired(),
        isDisabled: !node.getIsRequired(),
      },
      children: node?.getChildren()?.map((child: any) => FieldsTreeAdapter.toTreeNode(child)),
      originalEntry: node,
    };
  }
}
