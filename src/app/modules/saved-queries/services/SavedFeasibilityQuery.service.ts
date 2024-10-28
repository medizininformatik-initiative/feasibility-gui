import { map, Observable, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { SavedFeasibilityQueryAdapter } from 'src/app/shared/models/SavedQueryTile/SavedFeasibilityQueryAdapter';
import { BackendService } from '../../feasibility-query/service/backend.service';

@Injectable({
  providedIn: 'root',
})
export class SavedFeasibilityQueryService {
  constructor(private backendService: BackendService) {}

  public loadSavedQueries(): Observable<InterfaceSavedQueryTile[]> {
    return this.backendService
      .loadSavedQueries()
      .pipe(
        map((queries) =>
          queries
            .sort((a, b) => a.id - b.id)
            .map((query) => SavedFeasibilityQueryAdapter.adapt(query))
        )
      );
  }
  public deleteQuery(id: number): Observable<any> {
    return this.backendService.deleteSavedQuery(id);
  }

  public loadQueryIntoEditor(id: number): Observable<any> {
    return this.backendService.loadStructuredQuery(id);
  }
}
