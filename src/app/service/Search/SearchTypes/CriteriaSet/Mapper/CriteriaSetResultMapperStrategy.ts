import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';

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
    return new DisplayData(
      data.translations?.map(
        (translation) => new Translation(translation.language, translation.value)
      ),
      data.original
    );
  }

  public checkValuesForTypeString(value: string | string[]): string[] {
    if (typeof value == 'string') {
      if (value.length > 0) {
        return [value];
      } else {
        return [];
      }
    } else {
      return value;
    }
  }
}
