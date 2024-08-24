import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';

/**
 * We assume that the name of the filter is unique and therefore is used by us as an id to identifie a filter
 */
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
