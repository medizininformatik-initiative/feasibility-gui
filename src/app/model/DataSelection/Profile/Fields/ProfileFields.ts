import { DisplayData } from '../DisplayData';

export class ProfileFields {
  private id: string;
  private display: DisplayData;
  private description: DisplayData;
  private children: ProfileFields[] = [];
  private isSelected = false;
  private isRequired = false;
  private recommended = false;
  private mustHave: boolean;

  constructor(
    id: string,
    display: DisplayData,
    description: DisplayData,
    children: ProfileFields[] = [],
    isSelected: boolean = false,
    isRequired: boolean = false,
    recommended: boolean,
    mustHave: boolean
  ) {
    this.id = id;
    this.display = display;
    this.description = description;
    this.children = children;
    this.isSelected = isSelected;
    this.isRequired = isRequired;
    this.recommended = recommended;
    this.mustHave = mustHave;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getDisplay(): DisplayData {
    return this.display;
  }

  public setDisplay(value: DisplayData): void {
    this.display = value;
  }

  public getDescription(): DisplayData {
    return this.description;
  }

  public setDescription(value: DisplayData): void {
    this.description = value;
  }

  public getChildren(): ProfileFields[] {
    return this.children;
  }

  public setChildren(value: ProfileFields[]): void {
    this.children = value;
  }

  public getIsSelected(): boolean {
    return this.isSelected;
  }

  public setIsSelected(isSelected: boolean): void {
    this.isSelected = isSelected;
  }

  public getIsRequired(): boolean {
    return this.isRequired;
  }

  public setIsRequired(value: boolean): void {
    this.isRequired = value;
  }

  public getRecommended(): boolean {
    return this.recommended;
  }

  public setRecommended(recommended: boolean): void {
    this.recommended = recommended;
  }

  public getMustHave(): boolean {
    return this.mustHave;
  }

  public setMustHave(mustHave: boolean): void {
    this.mustHave = mustHave;
  }
}
