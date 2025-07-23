import { Injectable } from '@angular/core';
import { SearchService } from '../Search/Search.service';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchDataResolverService {
  constructor(private searchService: SearchService) {}

  public resolve(): Observable<SearchTermResultList> {
    return this.searchService.searchCriteria('');
  }
}
