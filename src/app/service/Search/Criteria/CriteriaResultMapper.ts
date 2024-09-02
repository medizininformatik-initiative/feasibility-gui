import { AbstractResultMapper } from '../AbstractResultMapper';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

export class CriteriaResultMapper extends AbstractResultMapper<
  SearchTermListEntry,
  SearchTermResultList
> {
  public mapResponseToResultList(response: any): SearchTermResultList {
    const listItems: SearchTermListEntry[] = this.mapResponseToEntries(response.results);
    return new SearchTermResultList(response.totalHits, listItems);
  }
  p;
  public mapResponseToEntries(results: any[]): SearchTermListEntry[] {
    return results.map(
      (resultItem: any) =>
        new SearchTermListEntry(
          resultItem.availability,
          resultItem.selectable,
          resultItem.terminology,
          resultItem.termcode,
          resultItem.kdsModule,
          resultItem.name,
          resultItem.id
        )
    );
  }
}
