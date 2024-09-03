import { CriteriaSetResultMapperStrategy } from './Mapper/CriteriaSetResultMapperStrategy';
import { CriteriaSetSearchUrlStrategy } from './Url/CriteriaSetSearchUrlStrategy';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { SearchContext } from '../../Strategy/SearchContext';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSetSearchEngine {
  private searchText: string;
  private criteriaSetUrls: string[];

  constructor(searchText: string, criteriaSetUrls: string[]) {
    this.searchText = searchText;
    this.criteriaSetUrls = criteriaSetUrls;
  }

  public executeSearch(): Observable<ReferenceCriteriaResultList> {
    const searchStrategy = new CriteriaSetSearchUrlStrategy(this.searchText, this.criteriaSetUrls);
    const mappingStrategy = new CriteriaSetResultMapperStrategy();
    const searchContext = new SearchContext(searchStrategy, mappingStrategy);
    return searchContext.executeSearch();
  }
}
