import { InjectionToken } from '@angular/core';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';

export const SEARCH_TERM_ENTRY = new InjectionToken<InterfaceListEntry>('SEARCH_TERM_ENTRY');
export const CODEABLE_CONCEPT_ENTRY = new InjectionToken<InterfaceListEntry>(
  'CODEABLE_CONCEPT_ENTRY'
);
