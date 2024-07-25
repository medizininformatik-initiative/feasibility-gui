import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';

export const mapToCodeableConceptResultList = (item: any): CodeableConceptResultList => {
  const listItems: Array<CodeableConceptResultListEntry> = item.results.map((resultItem) => {
    const terminologyCode = new TerminologyCode(
      resultItem.termCode.code,
      resultItem.termCode.display,
      resultItem.termCode.system,
      resultItem.termCode.version
    );
    return new CodeableConceptResultListEntry(terminologyCode, item.termCodecode);
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
