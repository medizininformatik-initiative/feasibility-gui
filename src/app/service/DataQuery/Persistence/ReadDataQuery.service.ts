import { CRTDL2UIModelService } from '../../Translator/CRTDL/CRTDL2UIModel.service';
import { DataQueryApiService } from '../../Backend/Api/DataQueryApi.service';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';
import { SavedDataQueryData } from 'src/app/model/Interface/SavedDataQueryData';
import { SavedDataQueryListItemData } from 'src/app/model/Interface/SavedDataQueryListItemData';
import { TypeAssertion } from '../../TypeGuard/TypeAssersations';

@Injectable({
  providedIn: 'root',
})
export class ReadDataQueryService {
  constructor(
    private dataQueryApiService: DataQueryApiService,
    private crtdl2UIModelService: CRTDL2UIModelService
  ) {}

  public readSavedQueries(): Observable<SavedDataQueryListItemData[]> {
    return this.dataQueryApiService
      .getDataQuery()
      .pipe(map((queries) => this.processQueries(queries)));
  }

  private processQueries(queries: SavedDataQueryListItemData[]): SavedDataQueryListItemData[] {
    try {
      this.assertQueries(queries);
      return queries;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private assertQueries(queries: SavedDataQueryListItemData[]): void {
    queries.every((query) => TypeAssertion.assertSavedDataQueryListItemData(query));
  }

  public readDataQueryById(id: number): Observable<SavedDataQuery> {
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
