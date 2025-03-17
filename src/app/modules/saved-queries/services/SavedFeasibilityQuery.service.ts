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
import { TypeAssertion } from 'src/app/service/TypeGuard/TypeAssersations';

@Injectable({
  providedIn: 'root',
})
export class SavedFeasibilityQueryService {
  constructor(
    private dataQueryApiService: DataQueryApiService,
    private crtdl2UIModelService: CRTDL2UIModelService
  ) {}

  public loadSavedQueries(): Observable<InterfaceSavedQueryTile[]> {
    return this.dataQueryApiService.getDataQuery().pipe(
      map((queries) => {
        try {
          queries.every((query) => TypeAssertion.assertSavedDataQueryListItemData(query));
          return queries.map((query) => {
            const savedDataQueryListItem = SavedDataQueryListItem.fromJson(query);
            return SavedFeasibilityQueryAdapter.adapt(savedDataQueryListItem);
          });
        } catch (error) {
          console.error(error);
          throw error;
        }
      })
    );
  }

  public deleteQuery(id: number): Observable<any> {
    return this.dataQueryApiService.deleteDataQueryById(id);
  }

  public getDataQueryById(id: number): Observable<SavedDataQuery> {
    return this.dataQueryApiService.getDataQueryById(id).pipe(
      switchMap((data) => {
        try {
          TypeAssertion.assertSavedDataQueryData(data);
          return this.transformDataQuery(data);
        } catch (error) {
          console.error(error);
          throw error;
        }
      })
    );
  }

  private transformDataQuery(data: SavedDataQueryData): Observable<SavedDataQuery> {
    return this.crtdl2UIModelService
      .createCRDTLFromJson(data.content)
      .pipe(map((uiCRTDL) => SavedDataQuery.fromJson(data, uiCRTDL)));
  }
}
