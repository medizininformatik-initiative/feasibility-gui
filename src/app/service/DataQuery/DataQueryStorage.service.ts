import { DeleteDataQueryService } from './Persistence/DeleteDataQuery.service';
import { Injectable } from '@angular/core';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { Observable } from 'rxjs';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';
import { ReadDataQueryService } from './Persistence/ReadDataQuery.service';
import { SavedDataQueryService } from './Persistence/SaveDataQuery.service';

@Injectable({
  providedIn: 'root',
})
export class DataQueryStorageService {
  constructor(
    private readDataQueryService: ReadDataQueryService,
    private deleteDataQueryService: DeleteDataQueryService,
    private saveDataQueryService: SavedDataQueryService
  ) {}

  public saveDataQuery(data: any): void {
    this.saveDataQueryService.saveDataQuery(data);
  }

  public readDataQueries(): Observable<InterfaceSavedQueryTile[]> {
    return this.readDataQueryService.readSavedQueries();
  }

  public deleteDataQueryById(id: number): Observable<any> {
    return this.deleteDataQueryService.deleteDataQueryById(id);
  }

  public readDataQueryById(id: number): Observable<SavedDataQuery> {
    return this.readDataQueryService.readDataQueryById(id);
  }
}
