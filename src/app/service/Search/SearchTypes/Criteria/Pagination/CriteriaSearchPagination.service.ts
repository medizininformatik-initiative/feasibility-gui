import { CriteriaSearchMediatorService } from '../Mediator/CriteriaSearchMediator.service';
import { Injectable } from '@angular/core';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { SimpleSearchPagination } from '../../../Abstract/Pagination/SimpleSearchPagination';

@Injectable({ providedIn: 'root' })
export class CriteriaSearchPaginationService extends SimpleSearchPagination<
  SearchTermListEntry,
  SearchTermResultList
> {
  constructor(searchService: CriteriaSearchMediatorService) {
    super(searchService);
  }
}
