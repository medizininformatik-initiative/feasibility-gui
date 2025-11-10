import { BulkSearchResponseData } from '../../Interface/BulkSearchResponseData';
import { BulkSearchResponseFoundData } from '../../Interface/BulkSearchResponseFoundData';
import { CriteriaBulkEntry } from '../ListEntries/CriteriaBulkEntry';
import { AbstractResultList } from './AbstractResultList';

export class CriteriaBulkResultList {
  found: CriteriaBulkEntry[];
  notFound: string[];
  uiProfileId: string;
  constructor(found: CriteriaBulkEntry[], notFound: string[], uiProfileId: string) {
    this.found = found;
    this.notFound = notFound;
    this.uiProfileId = uiProfileId;
  }

  public getFound(): CriteriaBulkEntry[] {
    return this.found;
  }

  public setFound(found: CriteriaBulkEntry[]): void {
    this.found = found;
  }

  public getNotFound(): string[] {
    return this.notFound;
  }

  public setNotFound(notFound: string[]): void {
    this.notFound = notFound;
  }

  public getUiProfileId(): string {
    return this.uiProfileId;
  }

  public setUiProfileId(uiProfileId: string): void {
    this.uiProfileId = uiProfileId;
  }

  public static fromJson(json: BulkSearchResponseData): CriteriaBulkResultList {
    const foundEntries: CriteriaBulkEntry[] = json.found.map((entry: BulkSearchResponseFoundData) =>
      CriteriaBulkEntry.fromJson(entry)
    );
    return new CriteriaBulkResultList(foundEntries, json.notFound, json.uiProfileId);
  }
}
