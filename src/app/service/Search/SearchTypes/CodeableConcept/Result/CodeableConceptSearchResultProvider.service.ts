import { AbstractSearchResultProviderService } from '../../../Abstract/AbstractSearchResultProvider.servcie';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptSearchResultProviderService extends AbstractSearchResultProviderService<
  CodeableConceptResultListEntry,
  CodeableConceptResultList
> {}
