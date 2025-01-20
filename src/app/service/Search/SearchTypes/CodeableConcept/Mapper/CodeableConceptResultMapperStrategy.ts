import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { MappingStrategy } from '../../../Interface/InterfaceMappingStrategy';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';

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
    return response.map((resultItem: any) => {
      const terminologyCode = new TerminologyCode(
        resultItem.termCode.code,
        resultItem.termCode.display,
        resultItem.termCode.system,
        resultItem.termCode.version
      );
      return new CodeableConceptResultListEntry(
        new Concept(this.instantiateDisplayData(resultItem.display), terminologyCode),
        uuidv4()
      );
    });
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
