import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CriteriaBulkResultList } from 'src/app/model/Search/ResultList/CriteriaBulkResultList';
import { BulkCriteriaSearchMapping } from './BulkCriteriaSearchMapping';
import { TerminologyApiService } from '../../Backend/Api/TerminologyApi.service';
import { BulkSearchPostData } from 'src/app/model/Interface/BulkSearchPostData';
import { BulkSearchResponseData } from 'src/app/model/Interface/BulkSearchResponseData';

@Injectable({
  providedIn: 'root',
})
export class BulkCriteriaSearchEngineService {
  constructor(private terminologyApiService: TerminologyApiService) {}

  public search(
    searchterms: string,
    terminology: string,
    context: string
  ): Observable<CriteriaBulkResultList> {
    const mapping = new BulkCriteriaSearchMapping();
    const body = this.createPostData(searchterms, terminology, context);
    return this.terminologyApiService
      .postTerminologyBulkSearch(body)
      .pipe(map((response: BulkSearchResponseData) => mapping.mapResponseToResultList(response)));
  }

  private createPostData(
    searchterms: string,
    terminology: string,
    context: string
  ): BulkSearchPostData {
    const parsedSearchTerms = searchterms.split(/[\s,;]+/).filter(Boolean);
    return {
      searchterms: parsedSearchTerms,
      terminology,
      context,
    };
  }
}
