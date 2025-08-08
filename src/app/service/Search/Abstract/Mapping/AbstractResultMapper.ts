import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';

export abstract class AbstractResultMapper<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  abstract mapResponseToResultList(response: any): T;
  abstract mapResponseToEntries(results: any[]): C[];
}
