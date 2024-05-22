class SearchTermResultList {
  totalHits: number;
  searchTermListItems: Array<SearchTermListItem>;

  constructor(totalHits: number, searchTermListItems: Array<SearchTermListItem>) {
    this.totalHits = totalHits;
    this.searchTermListItems = searchTermListItems;
  }

  getTotalHits() {
    return this.totalHits;
  }

  setTotalHits(totalHits: number): void {
    this.totalHits = totalHits;
  }

  getResults(): Array<SearchTermListItem> {
    return this.searchTermListItems;
  }

  setResults(searchTermListItems: Array<SearchTermListItem>): void {
    this.searchTermListItems = searchTermListItems;
  }
}
