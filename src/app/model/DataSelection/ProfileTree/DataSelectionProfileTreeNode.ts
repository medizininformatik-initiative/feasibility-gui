export class DataSelectionProfileTreeNode {
  id: string;
  name: string;
  display: string;
  module: string;
  url: string;
  leaf: boolean;
  selectable: boolean;
  children: DataSelectionProfileTreeNode[] = [];

  constructor(
    id: string,
    name: string,
    display: string,
    module: string,
    url: string,
    leaf: boolean,
    selectable: boolean,
    children: DataSelectionProfileTreeNode[]
  ) {
    this.id = id;
    this.name = name;
    this.display = display;
    this.module = module;
    this.url = url;
    this.leaf = leaf;
    this.selectable = selectable;
    this.children = children;
  }
}
