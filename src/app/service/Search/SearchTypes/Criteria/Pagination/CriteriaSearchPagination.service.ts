import { AbstractSearchPagination } from '../../../Abstract/AbstractSearchPagination';
import { CriteriaSearchMediatorService } from '../Mediator/CriteriaSearchMediator.service';
import { Injectable } from '@angular/core';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({ providedIn: 'root' })
export class CriteriaSearchPaginationService extends AbstractSearchPagination<
  SearchTermListEntry,
  SearchTermResultList
> {
  constructor(searchService: CriteriaSearchMediatorService) {
    super(searchService);
  }
}
