import { AbstractListEntry } from '../ListEntries/AbstractListEntry';

export abstract class AbstractResultList<C extends AbstractListEntry> {
  protected totalHits: number;
  protected results: Array<C>;

  constructor(totalHits: number, results: Array<C>) {
    this.totalHits = totalHits;
    this.results = results;
  }

  /**
   * @returns total Hits for the search term
   */
  public getTotalHits(): number {
    return this.totalHits;
  }

  /**
   * Sets the total hits
   *
   * @param totalHits
   */
  public setTotalHits(totalHits: number): void {
    this.totalHits = totalHits;
  }

  /**
   * An Array of items representing the search results
   *
   * @returns
   */
  public getResults(): Array<C> {
    return this.results;
  }

  /**
   * Sets the results of a search
   *
   * @param results
   */
  public setResults(results: Array<C>): void {
    this.results = results;
  }
}
