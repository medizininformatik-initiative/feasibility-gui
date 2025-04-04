import { Display } from '../Display';

export class ProfileFields {
  private elementId: string;
  private display: Display;
  private description: Display;
  private children: ProfileFields[] = [];
  private isSelected = false;
  private isRequired = false;
  private recommended = false;
  private referencedProfileUrls: string[];

  constructor(
    elementId: string,
    display: Display,
    description: Display,
    children: ProfileFields[] = [],
    isSelected: boolean = false,
    isRequired: boolean = false,
    recommended: boolean,
    referencedProfileUrls: string[]
  ) {
    this.elementId = elementId;
    this.display = display;
    this.description = description;
    this.children = children;
    this.isSelected = isSelected;
    this.isRequired = isRequired;
    this.recommended = recommended;
    this.referencedProfileUrls = referencedProfileUrls;
  }

  public getElementId(): string {
    return this.elementId;
  }

  public setElementId(elementId: string): void {
    this.elementId = elementId;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public setDisplay(value: Display): void {
    this.display = value;
  }

  public getDescription(): Display {
    return this.description;
  }

  public setDescription(value: Display): void {
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

  public getReferencedProfileUrls(): string[] {
    return this.referencedProfileUrls;
  }

  public setReferencedProfileUrls(referencedProfileUrls: string[]): void {
    this.referencedProfileUrls = referencedProfileUrls;
  }
}
