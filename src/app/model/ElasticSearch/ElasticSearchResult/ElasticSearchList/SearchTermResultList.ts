import { SearchTermListEntry } from './SearchTermListEntry';

export class SearchTermResultList {
  totalHits: number;
  results: Array<SearchTermListEntry>;

  /**
   *
   * @param totalHits
   * @param searchTermListItems
   */
  constructor(totalHits: number, searchTermListItems: Array<SearchTermListEntry>) {
    this.totalHits = totalHits;
    this.results = searchTermListItems;
  }

  /**
   *
   * @returns total Hits for the search term
   */
  getTotalHits() {
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
   * An Array of SeachTermListItems reprersenting the search term results
   *
   * @see SeachTermListItems
   * @returns
   */
  getResults(): Array<SearchTermListEntry> {
    return this.results;
  }

  /**
   *
   * @param searchTermListItems
   */
  setResults(searchTermListItems: Array<SearchTermListEntry>): void {
    this.results = searchTermListItems;
  }
}
