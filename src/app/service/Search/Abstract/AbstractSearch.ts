import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { InterfaceUrlBuilder } from '../Backend/UrlBuilder/InterfaceUrlBuilder';
import { AbstractResultMapper } from './AbstractResultMapper';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';

export abstract class AbstractSearch {
  abstract getSearchUrl(): string;

  abstract getResultMapper(): AbstractResultMapper<
    AbstractListEntry,
    AbstractResultList<AbstractListEntry>
  >;
}
