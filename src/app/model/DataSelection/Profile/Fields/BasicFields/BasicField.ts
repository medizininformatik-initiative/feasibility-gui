import { Display } from '../../Display';
import { AbstractField } from '../AbstractField';

export class BasicField extends AbstractField {
  private children: BasicField[] = [];
  private isSelected = false;

  constructor(
    elementId: string,
    display: Display,
    description: Display,
    children: BasicField[] = [],
    recommended: boolean,
    isSelected: boolean = false,
    isRequired: boolean = false
  ) {
    super(elementId, display, description, isRequired, recommended);
    this.children = children;
    this.isSelected = isSelected;
  }

  public getChildren(): BasicField[] {
    return this.children;
  }

  public setChildren(abstractField: BasicField[]): void {
    this.children = abstractField;
  }

  public getIsSelected(): boolean {
    return this.isSelected;
  }

  public setIsSelected(isSelected: boolean): void {
    this.isSelected = isSelected;
  }
}
