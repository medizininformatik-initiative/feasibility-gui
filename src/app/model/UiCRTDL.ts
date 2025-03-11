import { DataExtraction } from './CRTDL/DataExtraction/DataExtraction';
import { DataSelection } from './DataSelection/DataSelection';
import { FeasibilityQuery } from './FeasibilityQuery/FeasibilityQuery';

export class UiCRTDL {
  private feasibilityQuery: FeasibilityQuery;
  private dataSelection: DataSelection;

  constructor(feasibilityQuery: FeasibilityQuery, dataSelection: DataSelection) {
    this.feasibilityQuery = feasibilityQuery;
    this.dataSelection = dataSelection;
  }

  public getFeasibilityQuery(): FeasibilityQuery {
    return this.feasibilityQuery;
  }

  public setFeasibilityQuery(feasibilityQuery: FeasibilityQuery): void {
    this.feasibilityQuery = feasibilityQuery;
  }

  public getDataExtraction(): DataSelection {
    return this.dataSelection;
  }

  public setDataExtraction(dataSelection: DataSelection): void {
    this.dataSelection = dataSelection;
  }
}
