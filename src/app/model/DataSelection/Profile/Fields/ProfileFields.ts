import { Display } from '../Display';

export class ProfileFields {
  private id: string;
  private display: Display;
  private description: Display;
  private children: ProfileFields[] = [];
  private isSelected = false;
  private isRequired = false;
  private recommended = false;
  private mustHave: boolean;
  private referencedProfiles: string[];

  constructor(
    id: string,
    display: Display,
    description: Display,
    children: ProfileFields[] = [],
    isSelected: boolean = false,
    isRequired: boolean = false,
    recommended: boolean,
    mustHave: boolean,
    referencedProfiles: string[]
  ) {
    this.id = id;
    this.display = display;
    this.description = description;
    this.children = children;
    this.isSelected = isSelected;
    this.isRequired = isRequired;
    this.recommended = recommended;
    this.mustHave = mustHave;
    this.referencedProfiles = referencedProfiles;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
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

  public getMustHave(): boolean {
    return this.mustHave;
  }

  public setMustHave(mustHave: boolean): void {
    this.mustHave = mustHave;
  }

  public getReferencedProfiles(): string[] {
    return this.referencedProfiles;
  }

  public setReferencedProfiles(referencedProfiles: string[]): void {
    this.referencedProfiles = referencedProfiles;
  }
}
