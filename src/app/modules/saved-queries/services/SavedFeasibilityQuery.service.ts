import { CRTDL2UIModelService } from 'src/app/service/Translator/CRTDL/CRTDL2UIModel.service';
import { DataQueryApiService } from 'src/app/service/Backend/Api/DataQueryApi.service';
import { FeasibilityQueryApiService } from 'src/app/service/Backend/Api/FeasibilityQueryApi.service';
import { Injectable } from '@angular/core';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { map, Observable, switchMap, tap } from 'rxjs';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';
import { SavedDataQueryData } from 'src/app/model/Interface/SavedDataQueryData';
import { SavedDataQueryListItem } from 'src/app/model/SavedDataQuery/SavedDataQueryListItem';
import { SavedFeasibilityQueryAdapter } from 'src/app/shared/models/SavedQueryTile/SavedFeasibilityQueryAdapter';

@Injectable({
  providedIn: 'root',
})
export class SavedFeasibilityQueryService {
  constructor(
    private dataQueryApiService: DataQueryApiService,
    private crtdl2UIModelService: CRTDL2UIModelService,
    private feasibilityQueryApiService: FeasibilityQueryApiService
  ) {}

  public loadSavedQueries(): Observable<InterfaceSavedQueryTile[]> {
    return this.dataQueryApiService.getDataQuery().pipe(
      tap((queries) => console.log(queries)),
      map((queries) =>
        queries
          //.sort((a, b) => a.id - b.id)
          .map((query) => {
            const savedDataQueryListItem = SavedDataQueryListItem.fromJson(query);
            return SavedFeasibilityQueryAdapter.adapt(savedDataQueryListItem);
          })
      )
    );
  }
  public deleteQuery(id: number): Observable<any> {
    return this.dataQueryApiService.deleteDataQueryById(id);
  }

  public loadQueryIntoEditor(id: number): Observable<SavedDataQuery> {
    return this.dataQueryApiService.getDataQueryById(id).pipe(
      switchMap((data) =>
        /*         if (!isSavedDataQueryData(data)) {
          throw new Error('Invalid data format: Expected SavedDataQueryData')
        } */
        this.transformDataQuery(data)
      )
    );
  }

  private transformDataQuery(data: SavedDataQueryData): Observable<SavedDataQuery> {
    return this.crtdl2UIModelService
      .createCRDTLFromJson(data.content)
      .pipe(map((uiCRTDL) => SavedDataQuery.fromJson(data, uiCRTDL)));
  }
}
