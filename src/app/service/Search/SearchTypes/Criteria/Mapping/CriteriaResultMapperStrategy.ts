import { AbstractResultMapper } from '../../../Abstract/Mapping/AbstractResultMapper';
import { CriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/CriteriaResultList';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { CriteriaListEntry } from 'src/app/shared/models/ListEntries/CriteriaListListEntry';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
export class CriteriaResultMapperStrategy extends AbstractResultMapper<
  CriteriaListEntry,
  CriteriaResultList
> {
  public mapResponseToResultList(response: any): CriteriaResultList {
    const listItems: CriteriaListEntry[] = this.mapResponseToEntries(response.results);
    return new CriteriaResultList(response.totalHits, listItems);
  }

  /**
   *
   * @param results
   * @returns
   * @todo create Instance of displayData and Translation
   */
  public mapResponseToEntries(results: any[]): CriteriaListEntry[] {
    return results.map(
      (resultItem: any) =>
        new CriteriaListEntry(
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
