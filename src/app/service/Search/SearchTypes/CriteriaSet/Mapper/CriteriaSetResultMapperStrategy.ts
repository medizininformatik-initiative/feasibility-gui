import { MappingStrategy } from '../../../Strategy/InterfaceMappingStrategy';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

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
        new ReferenceCriteriaListEntry(this.createTerminologyCode(resultItem), resultItem.id)
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
}
