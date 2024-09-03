import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { MappingStrategy } from '../../../Strategy/InterfaceMappingStrategy';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

export class CodeableConceptResultMapperStrategy
  implements MappingStrategy<CodeableConceptResultListEntry, CodeableConceptResultList>
{
  public mapResponseToResultList(response: any): CodeableConceptResultList {
    const listEntries: CodeableConceptResultListEntry[] = this.mapResponseToEntries(
      response.results
    );
    return new CodeableConceptResultList(response.totalHits, listEntries);
  }

  public mapResponseToEntries(response: any): CodeableConceptResultListEntry[] {
    return response.results?.map((resultItem: any) => {
      const terminologyCode = new TerminologyCode(
        resultItem.code,
        resultItem.display,
        resultItem.system,
        resultItem.version
      );
      return new CodeableConceptResultListEntry(terminologyCode, uuidv4());
    });
  }
}
