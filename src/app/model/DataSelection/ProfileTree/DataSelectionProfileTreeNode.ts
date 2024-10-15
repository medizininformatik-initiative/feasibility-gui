import { DisplayData } from '../Profile/DisplayData';

export class DataSelectionProfileTreeNode {
  private id: string;
  private name: string;
  private display: DisplayData;
  private module: string;
  private url: string;
  private leaf: boolean;
  private selectable: boolean;
  private children: DataSelectionProfileTreeNode[] = [];

  constructor(
    id: string,
    name: string,
    display: DisplayData,
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

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDisplay(): DisplayData {
    return this.display;
  }

  public setDisplay(display: DisplayData): void {
    this.display = display;
  }

  // Getter and setter for `module`
  public getModule(): string {
    return this.module;
  }

  public setModule(module: string): void {
    this.module = module;
  }

  public getUrl(): string {
    return this.url;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  public getLeaf(): boolean {
    return this.leaf;
  }

  public setLeaf(leaf: boolean): void {
    this.leaf = leaf;
  }

  public getSelectable(): boolean {
    return this.selectable;
  }

  public setSelectable(selectable: boolean): void {
    this.selectable = selectable;
  }

  public getChildren(): DataSelectionProfileTreeNode[] {
    return this.children;
  }

  public setChildren(children: DataSelectionProfileTreeNode[]): void {
    this.children = children;
  }
}
