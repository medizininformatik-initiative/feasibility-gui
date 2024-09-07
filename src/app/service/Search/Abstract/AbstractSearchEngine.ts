import { MappingStrategy } from '../Interface/InterfaceMappingStrategy';
import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';

export abstract class AbstractSearchEngine {
  abstract getUrl(): string;
  abstract getMapping(): MappingStrategy<AbstractListEntry, AbstractResultList<AbstractListEntry>>;

  public processResponse(response: any): AbstractResultList<AbstractListEntry> {
    return this.getMapping().mapResponseToResultList(response);
  }
}
