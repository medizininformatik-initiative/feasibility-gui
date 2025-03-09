import { SavedDataQueryListItemData } from '../Interface/SavedDataQueryListItemData';

export class SavedDataQueryListItem {
  private id: string;
  private name: string;
  private createdAt: string;
  private totalNumberOfResults?: number;
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
    name: string,
    createdAt: string,
    ccdl: { exists: boolean; isValid: boolean },
    dataSelection: { exists: boolean; isValid: boolean },
    totalNumberOfResults?: number
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.totalNumberOfResults = totalNumberOfResults;
    this.ccdl = ccdl;
    this.dataSelection = dataSelection;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string): void {
    this.name = value;
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
      json.createdAt,
      json.ccdl,
      json.dataSelection,
      json.totalNumberOfResults
    );
  }
}
