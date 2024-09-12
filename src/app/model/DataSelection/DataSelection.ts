import { DataSelectionProfileProfile } from './Profile/DataSelectionProfileProfile';

export class DataSelection {
  private id: string;

  private dataSelection: DataSelectionProfileProfile[] = [];

  constructor(dataSelection: DataSelectionProfileProfile[], id: string) {
    this.dataSelection = dataSelection;
    this.id = id;
  }

  public getDataSelection(): DataSelectionProfileProfile[] {
    return this.dataSelection;
  }

  public setDataSelection(dataSelction: DataSelectionProfileProfile[]): void {
    this.dataSelection = dataSelction;
  }

  public getId(): string {
    return this.id;
  }
}
