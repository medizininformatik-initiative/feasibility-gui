import { CRTDL } from '../CRTDL/DataExtraction/CRTDL';
import { SavedDataQueryData } from '../Interface/SavedDataQueryData';

export class SavedDataQuery {
  private crtdl: CRTDL;
  private comment: string;
  private label: string;
  private totalNumberOfPatients?: number;

  constructor(crtdl: CRTDL, comment: string, label: string, totalNumberOfPatients: number) {
    this.crtdl = crtdl;
    this.comment = comment;
    this.label = label;
    this.totalNumberOfPatients = totalNumberOfPatients;
  }

  public getComment(): string {
    return this.comment;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public getLabel(): string {
    return this.label;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  public getTotalNumberOfPatients(): number {
    return this.totalNumberOfPatients;
  }

  public setTotalNumberOfPatients(totalNumberOfPatients: number): void {
    this.totalNumberOfPatients = totalNumberOfPatients;
  }

  public getCrtdl(): CRTDL {
    return this.crtdl;
  }

  public setCrtdl(crtdl: CRTDL): void {
    this.crtdl = crtdl;
  }

  public static fromJson(json: SavedDataQueryData, crtdl: CRTDL): SavedDataQuery {
    return new SavedDataQuery(crtdl, json.comment, json.label, json.totalNumberOfPatients);
  }
}
