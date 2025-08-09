import { CriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/CriteriaResultList';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { CriteriaListEntry } from 'src/app/shared/models/ListEntries/CriteriaListListEntry';

export class CriteriaResulByIdMapperStrategy
  implements MappingStrategy<CriteriaListEntry, CriteriaResultList>
{
  public mapResponseToResultList(response: any): CriteriaResultList {
    const listItems: CriteriaListEntry[] = this.mapResponseToEntries(response);
    return new CriteriaResultList(1, listItems);
  }

  public mapResponseToEntries(results: any): CriteriaListEntry[] {
    const entry = new CriteriaListEntry(
      results.availability,
      results.selectable,
      results.terminology,
      results.termcode,
      results.kdsModule,
      this.instantiateDisplayData(results.display),
      results.id,
      results.context
    );

    return [entry];
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
