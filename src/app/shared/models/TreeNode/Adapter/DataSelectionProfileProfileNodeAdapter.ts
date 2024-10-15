import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { TreeNode } from '../TreeNodeInterface';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

export class FieldsTreeAdapter {
  static fromTree(trees: ProfileFields[], curLang: string): TreeNode[] {
    const result = [];
    trees.forEach((tree) => {
      result.push(FieldsTreeAdapter.toTreeNode(tree, curLang));
    });
    return result;
  }

  static toTreeNode(node: ProfileFields, curLang: string): TreeNode {
    const display = new DisplayData(
      node?.getDisplay().original,
      node?.getDisplay().translations
    ).getTranslation(curLang);
    const description = new DisplayData(
      node?.getDescription().original,
      node?.getDescription().translations
    ).getTranslation(curLang);

    return {
      id: node?.getId(),
      data: {
        name: display,
        display: display + ' (' + description + ')',
        selectable: true,
        isCheckboxSelected: node.getIsSelected(),
      },
      children: node
        ?.getChildren()
        ?.map((child: any) => FieldsTreeAdapter.toTreeNode(child, curLang)),
      originalEntry: node,
    };
  }
}
