import { BulkSearchResponseData } from 'src/app/model/Interface/BulkSearchResponseData';
import { CriteriaBulkResultList } from 'src/app/model/Search/ResultList/CriteriaBulkResultList';

export class BulkCriteriaSearchMapping {
  public mapResponseToResultList(response: BulkSearchResponseData): CriteriaBulkResultList {
    return CriteriaBulkResultList.fromJson(response);
  }
}
