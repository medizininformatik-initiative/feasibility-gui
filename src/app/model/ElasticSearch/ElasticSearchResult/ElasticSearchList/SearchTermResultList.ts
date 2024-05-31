import { SearchTermListItem } from './SearchTermListItem';

export class SearchTermResultList {
  totalHits: number;
  results: Array<SearchTermListItem>;

  /**
   *
   * @param totalHits
   * @param searchTermListItems
   */
  constructor(totalHits: number, searchTermListItems: Array<SearchTermListItem>) {
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
  getResults(): Array<SearchTermListItem> {
    return this.results;
  }

  /**
   *
   * @param searchTermListItems
   */
  setResults(searchTermListItems: Array<SearchTermListItem>): void {
    this.results = searchTermListItems;
  }
}
