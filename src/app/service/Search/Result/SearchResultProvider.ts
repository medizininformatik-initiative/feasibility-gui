import { CriteriaSearchResultProviderService } from '../SearchTypes/Criteria/Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';

@Injectable({
  providedIn: 'root',
})
/**
 * @deprecated
 */
export class SearchResultProvider {
  constructor(private criteriaResultProvider: CriteriaSearchResultProviderService) {}

  public getCriteriaSearchResults(): Observable<CriteriaResultList | null> {
    return this.criteriaResultProvider.getSearchResults();
  }
}
