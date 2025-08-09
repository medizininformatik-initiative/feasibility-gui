import { AbstractSimpleSearchResultProvider } from '../../../Abstract/Result/AbstractSimpleSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { CriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/CriteriaResultList';
import { CriteriaListEntry } from 'src/app/shared/models/ListEntries/CriteriaListListEntry';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchResultProviderService extends AbstractSimpleSearchResultProvider<
  CriteriaListEntry,
  CriteriaResultList
> {}
