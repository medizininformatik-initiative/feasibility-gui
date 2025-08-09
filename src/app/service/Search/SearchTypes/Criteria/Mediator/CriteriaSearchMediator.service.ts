import { AbstractSimpleSearchMediator } from '../../../Abstract/Mediator/AbstractSimpleSearchMediator';
import { CriteriaListEntry } from 'src/app/shared/models/ListEntries/CriteriaListListEntry';
import { CriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/CriteriaResultList';
import { CriteriaSearchEngineService } from '../Engine/CriteriaSearchEngine';
import { CriteriaSearchResultProviderService } from '../Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchMediatorService extends AbstractSimpleSearchMediator<
  CriteriaListEntry,
  CriteriaResultList
> {
  constructor(
    private criteriaSearchEngineService: CriteriaSearchEngineService,
    private criteriaSearchResultProviderService: CriteriaSearchResultProviderService
  ) {
    super(criteriaSearchResultProviderService, criteriaSearchEngineService);
  }
}
