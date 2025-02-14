import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';

export class CriteriaResulByIdMapperStrategy
  implements MappingStrategy<SearchTermListEntry, SearchTermResultList>
{
  public mapResponseToResultList(response: any): SearchTermResultList {
    const listItems: SearchTermListEntry[] = this.mapResponseToEntries(response);
    return new SearchTermResultList(1, listItems);
  }

  public mapResponseToEntries(results: any): SearchTermListEntry[] {
    const entry = new SearchTermListEntry(
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
