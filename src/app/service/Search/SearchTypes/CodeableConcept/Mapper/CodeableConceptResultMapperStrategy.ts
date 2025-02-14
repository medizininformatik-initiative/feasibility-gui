import { CodeableConceptResult } from 'src/app/model/Interface/CodeableConceptResult';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { Display } from 'src/app/model/DataSelection/Profile/DisplayData';
import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { SearchResponse } from 'src/app/model/Interface/SearchResponse';
import { SearchResult } from 'src/app/model/Interface/SearchResult';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { v4 as uuidv4 } from 'uuid';
import { TerminologyCodeData } from 'src/app/model/Interface/TerminologyCodeData ';

export class CodeableConceptResultMapperStrategy
  implements MappingStrategy<CodeableConceptResultListEntry, CodeableConceptResultList>
{
  public mapResponseToResultList(response: SearchResponse): CodeableConceptResultList {
    const listEntries: CodeableConceptResultListEntry[] = this.mapResponseToEntries(
      response.results
    );
    return new CodeableConceptResultList(response.totalHits, listEntries);
  }

  public mapResponseToEntries(response: SearchResult[]): CodeableConceptResultListEntry[] {
    return response.map((resultItem: CodeableConceptResult) => {
      const terminologyCode = this.mapTerminologyCode(resultItem.termCode);
      const concept = new Concept(this.instantiateDisplayData(resultItem.display), terminologyCode);
      return new CodeableConceptResultListEntry(concept, uuidv4());
    });
  }

  private mapTerminologyCode(resultItem: TerminologyCodeData): TerminologyCode {
    return new TerminologyCode(
      resultItem.code,
      resultItem.display,
      resultItem.system,
      resultItem.version
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
