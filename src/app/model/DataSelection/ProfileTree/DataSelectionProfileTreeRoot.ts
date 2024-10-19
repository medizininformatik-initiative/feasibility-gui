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

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getModule(): string {
    return this.module;
  }

  public setModule(value: string) {
    this.module = value;
  }

  public getUrl(): string {
    return this.url;
  }

  public setUrl(value: string) {
    this.url = value;
  }

  public getChildren(): DataSelectionProfileTreeNode[] {
    return this.children;
  }

  public setChildren(nodes: DataSelectionProfileTreeNode[]) {
    if (Array.isArray(nodes)) {
      this.children = nodes;
    } else {
      console.error('Children must be an array of DataSelectionProfileTreeNode.');
    }
  }

  public addChild(node: DataSelectionProfileTreeNode): void {
    this.children.push(node);
  }
}
