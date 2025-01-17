import { FeasibilityQueryApiService } from 'src/app/service/Backend/Api/FeasibilityQueryApi.service';
import { Injectable } from '@angular/core';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { map, Observable } from 'rxjs';
import { SavedFeasibilityQueryAdapter } from 'src/app/shared/models/SavedQueryTile/SavedFeasibilityQueryAdapter';

@Injectable({
  providedIn: 'root',
})
export class SavedFeasibilityQueryService {
  constructor(private feasibilityQueryApiService: FeasibilityQueryApiService) {}

  public loadSavedQueries(): Observable<InterfaceSavedQueryTile[]> {
    return this.feasibilityQueryApiService
      .getSavedFeasibilityQueries()
      .pipe(
        map((queries) =>
          queries
            .sort((a, b) => a.id - b.id)
            .map((query) => SavedFeasibilityQueryAdapter.adapt(query))
        )
      );
  }
  public deleteQuery(id: number): Observable<any> {
    return this.feasibilityQueryApiService.deleteSavedQuery(id);
  }

  public loadQueryIntoEditor(id: number): Observable<any> {
    return this.feasibilityQueryApiService.getStructuredQueryById(id);
  }
}
