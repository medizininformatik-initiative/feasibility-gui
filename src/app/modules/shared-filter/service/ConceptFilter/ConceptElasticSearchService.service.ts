import { BehaviorSubject, Observable } from 'rxjs';
import { CodeableConceptListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptListEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';

@Injectable({
  providedIn: 'root',
})
export class ConceptElasticSearchService {
  private searchResultsSubject = new BehaviorSubject<CodeableConceptResultList | null>(null);
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor(
    private elasticSearchService: ElasticSearchService<
      CodeableConceptResultList,
      CodeableConceptResultListEntry
    >
  ) {}

  searchConcepts(searchText: string, allowedConceptUri: string[]): void {
    this.elasticSearchService
      .startElasticSearch(searchText, allowedConceptUri)
      .pipe(map((response) => this.processElasticSearchResults(response)))
      .subscribe((results) => this.searchResultsSubject.next(results));
  }

  private processElasticSearchResults(
    response: CodeableConceptResultList
  ): CodeableConceptResultList {
    // Optionally process the results here
    return response;
  }

  public getCurrentSearchResults(): Observable<CodeableConceptResultList> {
    return this.searchResultsSubject.asObservable();
  }

  public adaptListItems(results: CodeableConceptResultList): TableData {
    return CodeableConceptListEntryAdapter.adapt(results.getResults());
  }
}
