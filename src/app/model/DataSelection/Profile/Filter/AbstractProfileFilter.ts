import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';

export abstract class AbstractProfileFilter {
  private type: string;
  private name: string;
  private uiType: DataSelectionFilterTypes;

  constructor(type: string, name: string, uiType: DataSelectionFilterTypes) {
    this.type = type;
    this.name = name;
    this.uiType = uiType;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getUiType(): DataSelectionFilterTypes {
    return this.uiType;
  }

  public setUiType(uiType: DataSelectionFilterTypes): void {
    this.uiType = uiType;
  }

  public getType(): string {
    return this.type;
  }
}
