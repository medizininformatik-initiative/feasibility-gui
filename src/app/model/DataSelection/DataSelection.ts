import { DataSelectionProfileProfile } from './Profile/DataSelectionProfileProfile';

export class DataSelection {
  private dataSelection: DataSelectionProfileProfile[] = [];

  constructor(dataSelection: DataSelectionProfileProfile[]) {
    this.dataSelection = dataSelection;
  }

  public getDataSelection(): DataSelectionProfileProfile[] {
    return this.dataSelection;
  }

  public setDataSelection(dataSelction: DataSelectionProfileProfile[]): void {
    this.dataSelection = dataSelction;
  }
}
