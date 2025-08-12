import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';
import { CriteriaSearchService } from '../Search/SearchTypes/Criteria/CriteriaSearch.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchDataResolverService {
  constructor(private searchService: CriteriaSearchService) {}

  public resolve(): Observable<CriteriaResultList> {
    return this.searchService.search('').pipe();
  }
}
