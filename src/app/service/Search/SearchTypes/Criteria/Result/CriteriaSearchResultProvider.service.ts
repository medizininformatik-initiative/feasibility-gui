import { AbstractSimpleSearchResultProvider } from '../../../Abstract/Result/AbstractSimpleSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchResultProviderService extends AbstractSimpleSearchResultProvider<
  SearchTermListEntry,
  SearchTermResultList
> {}
