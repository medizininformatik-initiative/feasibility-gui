import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { InjectionToken } from '@angular/core';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';

export const SEARCH_TERM_ENTRY = new InjectionToken<SearchTermListEntry>('SEARCH_TERM_ENTRY');
export const CODEABLE_CONCEPT_ENTRY = new InjectionToken<CodeableConceptResultListEntry>(
  'CODEABLE_CONCEPT_ENTRY'
);
export const REFERENCE_CRITERIA_ENTRY = new InjectionToken<ReferenceCriteriaListEntry>(
  'REFERENCE_CRITERIA_ENTRY'
);
