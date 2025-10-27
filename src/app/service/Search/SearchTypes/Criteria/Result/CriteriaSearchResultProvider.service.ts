import { AbstractSimpleSearchResultProvider } from '../../../Abstract/Result/AbstractSimpleSearchResultProvider.service';
import { Injectable } from '@angular/core';
import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';
import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchResultProviderService extends AbstractSimpleSearchResultProvider<
  CriteriaListEntry,
  CriteriaResultList
> {}
