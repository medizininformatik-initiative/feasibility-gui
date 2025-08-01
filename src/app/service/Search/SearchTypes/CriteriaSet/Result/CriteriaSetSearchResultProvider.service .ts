import { AbstractSearchResultProviderService } from '../../../Abstract/AbstractSearchResultProvider.servcie';
import { Injectable } from '@angular/core';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSetSearchResultProviderService extends AbstractSearchResultProviderService<
  ReferenceCriteriaListEntry,
  ReferenceCriteriaResultList
> {}
