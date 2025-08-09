import { CriteriaResulByIdMapperStrategy } from './Mapping/CriteriaResulByIdMapperStrategy';
import { CriteriaResultList } from 'src/app/model/Search/SearchResult/SearchList/ResultList/CriteriaResultList';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchResultSetterService } from '../../Result/SearchResultSetter.service';
import { TerminologyApiService } from 'src/app/service/Backend/Api/TerminologyApi.service';
import { TerminologyPaths } from 'src/app/service/Backend/Paths/TerminologyPaths';

@Injectable({
  providedIn: 'root',
})
export class CriteriaSearchSigleEntryEngineService {
  private readonly path: string = TerminologyPaths.ENTRY_ENDPOINT;

  constructor(
    private searchResultSetter: SearchResultSetterService,
    private terminologyApiService: TerminologyApiService
  ) {}

  public search(id: string): Observable<CriteriaResultList> {
    const mapping = this.getMapping();
    return this.terminologyApiService.getEntryById(id).pipe(
      map((result) => {
        this.searchResultSetter.setCriteriaSearchResults(mapping.mapResponseToResultList(result));
        return mapping.mapResponseToResultList(result);
      })
    );
  }

  public getMapping(): CriteriaResulByIdMapperStrategy {
    return new CriteriaResulByIdMapperStrategy();
  }
}
