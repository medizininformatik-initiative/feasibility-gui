import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

export class CriteriaResulByIdMapperStrategy
  implements MappingStrategy<SearchTermListEntry, SearchTermResultList>
{
  public mapResponseToResultList(response: any): SearchTermResultList {
    const listItems: SearchTermListEntry[] = this.mapResponseToEntries(response);
    return new SearchTermResultList(1, listItems);
  }
  p;
  public mapResponseToEntries(results: any): SearchTermListEntry[] {
    const entry = new SearchTermListEntry(
      results.availability,
      results.selectable,
      results.terminology,
      results.termcode,
      results.kdsModule,
      results.name,
      results.id
    );

    return [entry];
  }
}
