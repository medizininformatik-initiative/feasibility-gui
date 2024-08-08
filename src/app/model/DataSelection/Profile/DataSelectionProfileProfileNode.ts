export class DataSelectionProfileProfileNode {
  private id: string;
  private display: string;
  private name: string;
  private children: DataSelectionProfileProfileNode[] = [];
  private isSelected = false;
  private isRequired = false;

  constructor(
    id: string,
    display: string,
    name: string,
    children: DataSelectionProfileProfileNode[] = [],
    isSelected: boolean = false,
    isRequired: boolean = false
  ) {
    this.id = id;
    this.display = display;
    this.name = name;
    this.children = children;
    this.isSelected = isSelected;
    this.isRequired = isRequired;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getDisplay(): string {
    return this.display;
  }

  public setDisplay(value: string): void {
    this.display = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string): void {
    this.name = value;
  }

  public getChildren(): DataSelectionProfileProfileNode[] {
    return this.children;
  }

  public setChildren(value: DataSelectionProfileProfileNode[]): void {
    this.children = value;
  }

  public getIsSelected(): boolean {
    return this.isSelected;
  }

  public setIsSelected(value: boolean): void {
    this.isSelected = value;
  }

  public getIsRequired(): boolean {
    return this.isRequired;
  }

  public setIsRequired(value: boolean): void {
    this.isRequired = value;
  }
}
