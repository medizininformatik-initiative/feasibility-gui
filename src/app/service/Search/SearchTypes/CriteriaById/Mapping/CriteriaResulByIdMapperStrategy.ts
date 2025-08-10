import { CriteriaResultList } from 'src/app/model/Search/ResultList/CriteriaResultList';
import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';
import { CriteriaListEntryData } from 'src/app/model/Interface/Search/CriteriaListListEntryData';

export class CriteriaResulByIdMapperStrategy
  implements MappingStrategy<CriteriaListEntry, CriteriaResultList>
{
  /**
   * This is a special case where a single entry is only fetched. To collaborate with the interface MappingStrategy
   * the response is turned into an array and then again into a CriteriaResultList.
   * Maps a single response to a result list.
   * @param response The response data to map.
   * @returns The mapped result list.
   */
  public mapResponseToResultList(response: CriteriaListEntryData): CriteriaResultList {
    const listItems: CriteriaListEntry[] = this.mapResponseToEntries([response]);
    const totalHits = 1;
    return new CriteriaResultList(totalHits, listItems);
  }

  public mapResponseToEntries(results: CriteriaListEntryData[]): CriteriaListEntry[] {
    return results.map((entry) => CriteriaListEntry.fromJson(entry));
  }
}
