import { BehaviorSubject, Observable, of } from 'rxjs';
import { CodeableConceptListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptListEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/Search/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/model/Search/ListEntries/CodeableConceptResultListEntry';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';
import { BackendService } from 'src/app/service/Backend/Backend.service';

@Injectable({
  providedIn: 'root',
})
export class ConceptElasticSearchService {
  /**
   * @Todo muss ne Map vom BehaviourSubject werden, um mehrere Ergebnisslisten zu pflegen
   */
  private searchResultsSubject = new BehaviorSubject<CodeableConceptResultList | null>(null);
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor(private backendService: BackendService) {}

  public searchConcepts(searchText: string, allowedConceptUri: string[]): void {
    this.backendService
      .getElasticSearchResultsForCodeableConcept(searchText, allowedConceptUri)
      .pipe(
        map((response) => this.mapToCodeableConceptResultList(response)),
        catchError((error) => {
          console.error('Failed to fetch search results:', error);
          return of(new CodeableConceptResultList(0, []));
        })
      )
      .subscribe((results) => {
        if (results.getTotalHits() === 0) {
          console.warn('No results found for the search query.');
        }
        this.searchResultsSubject.next(results);
      });
  }

  public getCurrentSearchResults(): Observable<CodeableConceptResultList> {
    return this.searchResultsSubject.asObservable();
  }

  public adaptListItems(results: CodeableConceptResultList): TableData {
    return CodeableConceptListEntryAdapter.adapt(results.getResults());
  }

  private mapToCodeableConceptResultList(item: any): CodeableConceptResultList {
    const listItems: Array<CodeableConceptResultListEntry> = item.results.map((resultItem) => {
      const terminologyCode = new TerminologyCode(
        resultItem.code,
        resultItem.display,
        resultItem.system,
        resultItem.version
      );
      return new CodeableConceptResultListEntry(terminologyCode, uuidv4());
    });
    return new CodeableConceptResultList(item.totalHits, listItems);
  }

  public clearResultList() {
    this.searchResultsSubject.next(null);
  }
}
