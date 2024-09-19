import { InterfaceResultList } from './InterfaceResultList';

export abstract class AbstractResultList<T> implements InterfaceResultList<T> {
  totalHits: number;
  results: Array<T>;

  constructor(totalHits: number, results: Array<T>) {
    this.totalHits = totalHits;
    this.results = results;
  }

  /**
   * @returns total Hits for the search term
   */
  getTotalHits(): number {
    return this.totalHits;
  }

  /**
   * Sets the total hits
   *
   * @param totalHits
   */
  setTotalHits(totalHits: number): void {
    this.totalHits = totalHits;
  }

  /**
   * An Array of items representing the search term results
   *
   * @returns
   */
  getResults(): Array<T> {
    return this.results;
  }

  /**
   * Sets the results
   *
   * @param results
   */
  setResults(results: Array<T>): void {
    this.results = results;
  }
}
