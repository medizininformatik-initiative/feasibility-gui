import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';
import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';
import { CriteriaSearchMediatorService } from '../Mediator/CriteriaSearchMediator.service';
import { Injectable } from '@angular/core';
import { SimpleSearchPagination } from '../../../Abstract/Pagination/SimpleSearchPagination';

@Injectable({ providedIn: 'root' })
export class CriteriaSearchPaginationService extends SimpleSearchPagination<
  CriteriaListEntry,
  CriteriaResultList
> {
  constructor(protected mediator: CriteriaSearchMediatorService) {
    super(mediator);
  }
}
