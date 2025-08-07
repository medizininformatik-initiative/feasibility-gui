import { CriteriaSearchService } from '../Search/SearchTypes/Criteria/CriteriaSearch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchDataResolverService {
  constructor(private searchService: CriteriaSearchService) {}

  public resolve(): Observable<SearchTermResultList> {
    return this.searchService.search('').pipe();
  }
}
