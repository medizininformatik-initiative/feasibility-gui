import { AbstractResultMapper } from '../../../Abstract/AbstractResultMapper';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
export class CriteriaResultMapperStrategy extends AbstractResultMapper<
  SearchTermListEntry,
  SearchTermResultList
> {
  public mapResponseToResultList(response: any): SearchTermResultList {
    const listItems: SearchTermListEntry[] = this.mapResponseToEntries(response.results);
    return new SearchTermResultList(response.totalHits, listItems);
  }

  /**
   *
   * @param results
   * @returns
   * @todo create Instance of displayData and Translation
   */
  public mapResponseToEntries(results: any[]): SearchTermListEntry[] {
    return results.map(
      (resultItem: any) =>
        new SearchTermListEntry(
          resultItem.availability,
          resultItem.selectable,
          resultItem.terminology,
          resultItem.termcode,
          resultItem.kdsModule,
          this.instantiateDisplayData(resultItem.display),
          resultItem.id,
          resultItem.context
        )
    );
  }

  /**
   *
   * @param data @todo need to outsource this to a service
   * @returns
   */
  public instantiateDisplayData(data: any) {
    return new Display(
      data.translations?.map(
        (translation) => new Translation(translation.language, translation.value)
      ),
      data.original
    );
  }
}
