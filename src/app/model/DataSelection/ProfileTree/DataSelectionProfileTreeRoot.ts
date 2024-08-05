import { DataSelectionProfileTreeNode } from './DataSelectionProfileTreeNode';

export class DataSelectionProfileTreeRoot {
  private name: string;
  private module: string;
  private url: string;
  private children: DataSelectionProfileTreeNode[] = [];

  constructor(
    name: string = 'Root',
    module: string = 'no-module',
    url: string = 'no-url',
    children: DataSelectionProfileTreeNode[] = []
  ) {
    this.name = name;
    this.module = module;
    this.url = url;
    this.children = children;
  }

  // Getter for name
  getName(): string {
    return this.name;
  }

  // Setter for name with optional validation or transformation
  setName(name: string) {
    this.name = name;
  }

  // Getter for module
  getModule(): string {
    return this.module;
  }

  // Setter for module
  setModule(value: string) {
    this.module = value;
  }

  // Getter for URL
  getUrl(): string {
    return this.url;
  }

  // Setter for URL
  setUrl(value: string) {
    this.url = value;
  }

  // Getter for children
  getChildren(): DataSelectionProfileTreeNode[] {
    return this.children;
  }

  // Setter for children with optional logic
  setChildren(nodes: DataSelectionProfileTreeNode[]) {
    if (Array.isArray(nodes)) {
      this.children = nodes;
    } else {
      console.error('Children must be an array of DataSelectionProfileTreeNode.');
    }
  }

  addChild(node: DataSelectionProfileTreeNode): void {
    this.children.push(node);
  }
}
