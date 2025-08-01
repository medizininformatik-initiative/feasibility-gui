import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchService } from '../Search.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({ providedIn: 'root' })
export class PaginatedCriteriaSearchService {
  private resultsSubject = new BehaviorSubject<SearchTermListEntry[]>([]);
  public results$ = this.resultsSubject.asObservable();

  private currentPage = 0;
  private currentSearchText = '';

  constructor(private searchService: SearchService) {}

  public loadNextPage(): Observable<SearchTermResultList> {
    console.log('Loading next page of criteria search results...', this.currentPage);
    this.currentPage++;
    return this.searchService.searchCriteria(this.currentSearchText, this.currentPage);
  }
}
