import { SavedDataQueryListItemData } from '../Interface/SavedDataQueryListItemData';

export class SavedDataQueryListItem {
  private id: string;
  private label: string;
  private createdAt: string;
  private totalNumberOfResults?: number;
  private comment: string;
  private ccdl: {
    exists: boolean
    isValid: boolean
  };
  private dataSelection: {
    exists: boolean
    isValid: boolean
  };
  constructor(
    id: string,
    label: string,
    comment: string,
    createdAt: string,
    ccdl: { exists: boolean; isValid: boolean },
    dataSelection: { exists: boolean; isValid: boolean },
    totalNumberOfResults?: number
  ) {
    this.id = id;
    this.label = label;
    this.comment = comment;
    this.createdAt = createdAt;
    this.totalNumberOfResults = totalNumberOfResults;
    this.ccdl = ccdl;
    this.dataSelection = dataSelection;
  }

  public getComment(): string {
    return this.comment;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  public getLabel(): string {
    return this.label;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public getTotalNumberOfResults(): number | undefined {
    return this.totalNumberOfResults;
  }

  public setTotalNumberOfResults(value: number): void {
    this.totalNumberOfResults = value;
  }

  public getCcdl(): { exists: boolean; isValid: boolean } {
    return this.ccdl;
  }

  public setCcdl(value: { exists: boolean; isValid: boolean }): void {
    this.ccdl = value;
  }

  public getDataSelection(): { exists: boolean; isValid: boolean } {
    return this.dataSelection;
  }

  public setDataSelection(value: { exists: boolean; isValid: boolean }): void {
    this.dataSelection = value;
  }

  public static fromJson(json: SavedDataQueryListItemData): SavedDataQueryListItem {
    return new SavedDataQueryListItem(
      json.id,
      json.label,
      json.comment,
      json.lastModified,
      json.ccdl,
      json.dataExtraction,
      json.resultSize
    );
  }
}
