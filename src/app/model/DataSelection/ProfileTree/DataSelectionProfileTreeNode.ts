export class DataSelectionProfileTreeNode {
  private idValue: string;
  private nameValue: string;
  private displayValue: string;
  private moduleValue: string;
  private urlValue: string;
  private leafValue: boolean;
  private selectableValue: boolean;
  private childrenValue: DataSelectionProfileTreeNode[] = [];

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
    this.idValue = id;
    this.nameValue = name;
    this.displayValue = display;
    this.moduleValue = module;
    this.urlValue = url;
    this.leafValue = leaf;
    this.selectableValue = selectable;
    this.childrenValue = children;
  }

  // Getter and setter for `id`
  public getId(): string {
    return this.idValue;
  }

  public setId(id: string): void {
    this.idValue = id;
  }

  // Getter and setter for `name`
  public getName(): string {
    return this.nameValue;
  }

  public setName(name: string): void {
    this.nameValue = name;
  }

  // Getter and setter for `display`
  public getDisplay(): string {
    return this.displayValue;
  }

  public setDisplay(display: string): void {
    this.displayValue = display;
  }

  // Getter and setter for `module`
  public getModule(): string {
    return this.moduleValue;
  }

  public setModule(module: string): void {
    this.moduleValue = module;
  }

  // Getter and setter for `url`
  public getUrl(): string {
    return this.urlValue;
  }

  public setUrl(url: string): void {
    this.urlValue = url;
  }

  // Getter and setter for `leaf`
  public getLeaf(): boolean {
    return this.leafValue;
  }

  public setLeaf(leaf: boolean): void {
    this.leafValue = leaf;
  }

  // Getter and setter for `selectable`
  public getSelectable(): boolean {
    return this.selectableValue;
  }

  public setSelectable(selectable: boolean): void {
    this.selectableValue = selectable;
  }

  // Getter and setter for `children`
  public getChildren(): DataSelectionProfileTreeNode[] {
    return this.childrenValue;
  }

  public setChildren(children: DataSelectionProfileTreeNode[]): void {
    this.childrenValue = children;
  }
}
