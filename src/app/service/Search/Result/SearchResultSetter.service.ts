import { CodeableConceptSearchResultProviderService } from '../SearchTypes/CodeableConcept/Result/CodeableConceptSearchResultProvider.service';
import { CriteriaSearchResultProviderService } from '../SearchTypes/Criteria/Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { CriteriaSetSearchResultProviderService } from '../SearchTypes/CriteriaSet/Result/CriteriaSetSearchResultProvider.service ';
import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';

@Injectable({
  providedIn: 'root',
})
export class SearchResultSetterService {
  constructor(
    private criteriaResultProvider: CriteriaSearchResultProviderService,
    private criteriaSetResultProvider: CriteriaSetSearchResultProviderService,
    private codeableConceptResultProvider: CodeableConceptSearchResultProviderService
  ) {}

  /**
   * Sets the criteria search results.
   *
   * @param result The CriteriaResultList to set.
   */
  public setCriteriaSearchResults(result: CriteriaResultList): void {
    this.criteriaResultProvider.setSearchResults(result);
  }
}
