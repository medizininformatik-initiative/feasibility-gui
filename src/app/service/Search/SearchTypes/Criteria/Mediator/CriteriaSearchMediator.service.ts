import { AbstractSearchMediatorService } from '../../../Abstract/AbstractSearchMediator';
import { CriteriaSearchEngineService } from '../Engine/CriteriaSearchEngine';
import { CriteriaSearchResultProviderService } from '../Result/CriteriaSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchMediatorService extends AbstractSearchMediatorService<
  SearchTermListEntry,
  SearchTermResultList
> {
  constructor(
    private criteriaSearchEngineService: CriteriaSearchEngineService,
    private criteriaSearchResultProviderService: CriteriaSearchResultProviderService
  ) {
    super(criteriaSearchResultProviderService, criteriaSearchEngineService);
  }
}
