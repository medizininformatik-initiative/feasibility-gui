import { Injectable } from '@angular/core';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { AbstractSearchResultProviderService } from '../../../Abstract/AbstractSearchResultProvider.servcie';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchResultProviderService extends AbstractSearchResultProviderService<
  SearchTermListEntry,
  SearchTermResultList
> {}
