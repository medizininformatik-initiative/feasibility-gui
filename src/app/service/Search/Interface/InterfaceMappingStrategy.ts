import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';

export interface MappingStrategy<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  mapResponseToResultList(response: any): T
  mapResponseToEntries(results: any[]): C[]
}
