import { CRTDLFilterTypes } from 'src/app/model/Utilities/CRTDLFilterTypes';

export abstract class AbstractProfileFilter {
  private type: CRTDLFilterTypes;
  private name: string;
  private uiType: string;

  constructor(type: CRTDLFilterTypes, name: string, uiType: string) {
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

  public getUiType(): string {
    return this.uiType;
  }

  public setUiType(value: string): void {
    this.uiType = value;
  }

  public getType(): CRTDLFilterTypes {
    return this.type;
  }
}
