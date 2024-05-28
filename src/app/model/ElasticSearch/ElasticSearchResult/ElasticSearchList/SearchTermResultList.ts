import { SearchTermListItem } from './SearchTermListItem';

export class SearchTermResultList {
  totalHits: number;
  results: Array<SearchTermListItem>;

  constructor(totalHits: number, searchTermListItems: Array<SearchTermListItem>) {
    this.totalHits = totalHits;
    this.results = searchTermListItems;
  }

  getTotalHits() {
    return this.totalHits;
  }

  setTotalHits(totalHits: number): void {
    this.totalHits = totalHits;
  }

  getResults(): Array<SearchTermListItem> {
    return this.results;
  }

  setResults(searchTermListItems: Array<SearchTermListItem>): void {
    this.results = searchTermListItems;
  }
}
