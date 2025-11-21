import { CodeableConceptBulkEntry } from '../ListEntries/CodeableConceptBulkEntry';
import { CodeableConceptBulkSearchResponse } from '../../Interface/CodeableConceptBulkSearchResponse';

export class CodeableConceptBulkResultList {
  private found: CodeableConceptBulkEntry[];
  private notFound: string[];

  constructor(found: CodeableConceptBulkEntry[], notFound: string[]) {
    this.found = found;
    this.notFound = notFound;
  }

  /**
   * Returns the list of found codeable concepts.
   * @returns
   */
  public getFound(): CodeableConceptBulkEntry[] {
    return this.found;
  }

  /**
   * Returns the list of search terms that were not found.
   * @returns
   */
  public getNotFound(): string[] {
    return this.notFound;
  }

  public static fromJson(json: CodeableConceptBulkSearchResponse): CodeableConceptBulkResultList {
    const foundEntries = json.found.map((entryJson) => CodeableConceptBulkEntry.fromJson(entryJson));
    return new CodeableConceptBulkResultList(foundEntries, json.notFound);
  }
}
