import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { ReferenceCriteriaListEntry } from 'src/app/model/Search/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaListEntryData } from 'src/app/model/Interface/Search/ReferenceCriteriaListEntryData';
import { ReferenceCriteriaResultList } from 'src/app/model/Search/ResultList/ReferenceCriteriaResultList';
import { ReferenceCriteriaResultListData } from 'src/app/model/Interface/Search/RefrenceCriteriaResultListData';
import { TypeGuard } from 'src/app/service/TypeGuard/TypeGuard';

export class CriteriaSetResultMapperStrategy
  implements MappingStrategy<ReferenceCriteriaListEntry, ReferenceCriteriaResultList>
{
  /**
   * Maps the API response to a ReferenceCriteriaResultList.
   * @param response The API response object
   * @returns A mapped ReferenceCriteriaResultList
   */
  public mapResponseToResultList(
    response: ReferenceCriteriaResultListData
  ): ReferenceCriteriaResultList {
    const listItems: ReferenceCriteriaListEntry[] = this.mapResponseToEntries(response.results);
    return new ReferenceCriteriaResultList(response.totalHits, listItems);
  }

  /**
   * Maps the API response entries to a list of ReferenceCriteriaListEntry.
   * @param results The API response entries
   * @returns A list of mapped ReferenceCriteriaListEntry
   */
  public mapResponseToEntries(
    results: ReferenceCriteriaListEntryData[]
  ): ReferenceCriteriaListEntry[] {
    return results.map((resultItem: ReferenceCriteriaListEntryData) =>
      this.mapReferenceCriteriaListEntry(resultItem)
    );
  }

  /**
   * Maps a single API response entry to a ReferenceCriteriaListEntry.
   * @param resultItem The API response entry
   * @returns A mapped ReferenceCriteriaListEntry
   */
  private mapReferenceCriteriaListEntry(
    resultItem: ReferenceCriteriaListEntryData
  ): ReferenceCriteriaListEntry {
    TypeGuard.isReferenceCriteriaListEntryData(resultItem);
    return ReferenceCriteriaListEntry.fromJson(resultItem);
  }
}
