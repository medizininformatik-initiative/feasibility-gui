import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

export const mapToCodeableConceptResultList = (item: any): CodeableConceptResultList => {
  const listItems: Array<CodeableConceptResultListEntry> = item.results.map((resultItem) => {
    const terminologyCode = new TerminologyCode(
      resultItem.code,
      resultItem.display,
      resultItem.system,
      resultItem.version
    );
    return new CodeableConceptResultListEntry(terminologyCode, uuidv4());
  });
  return new CodeableConceptResultList(item.totalHits, listItems);
};

export const mapToSearchTermResultList = (item: any): SearchTermResultList => {
  const listItems: Array<SearchTermListEntry> = item.results.map(
    (resultItem) =>
      new SearchTermListEntry(
        resultItem.availability,
        resultItem.selectable,
        resultItem.terminology,
        resultItem.termcode,
        resultItem.kdsModule,
        resultItem.name,
        resultItem.id
      )
  );
  return new SearchTermResultList(item.totalHits, listItems);
};

export const mapToRefrenceCriteriaSetResultList = (item: any): ReferenceCriteriaResultList => {
  const listItems: Array<ReferenceCriteriaListEntry> = item.results.map(
    (resultItem) =>
      new ReferenceCriteriaListEntry(
        new TerminologyCode(
          resultItem.termcode,
          resultItem.name,
          resultItem.terminology,
          undefined
        ),
        resultItem.id
      )
  );
  return new ReferenceCriteriaResultList(item.totalHits, listItems);
};
