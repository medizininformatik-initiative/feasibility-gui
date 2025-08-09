import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/ReferenceCriteriaResultList';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { Display } from 'src/app/model/DataSelection/Profile/Display';

export class CriteriaSetResultMapperStrategy
  implements MappingStrategy<ReferenceCriteriaListEntry, ReferenceCriteriaResultList>
{
  public mapResponseToResultList(response: any): ReferenceCriteriaResultList {
    const listItems: ReferenceCriteriaListEntry[] = this.mapResponseToEntries(response.results);
    return new ReferenceCriteriaResultList(response.totalHits, listItems);
  }

  public mapResponseToEntries(results: any[]): ReferenceCriteriaListEntry[] {
    return results.map(
      (resultItem) =>
        new ReferenceCriteriaListEntry(
          this.instantiateDisplayData(resultItem.display),
          this.createTerminologyCode(resultItem),
          resultItem.id
        )
    );
  }

  private createTerminologyCode(resultItem: any) {
    return new TerminologyCode(
      resultItem.termcode,
      resultItem.name,
      resultItem.terminology,
      undefined
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
