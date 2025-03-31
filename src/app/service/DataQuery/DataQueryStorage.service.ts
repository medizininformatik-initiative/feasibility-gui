import { DeleteDataQueryService } from './Persistence/DeleteDataQuery.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadDataQueryService } from './Persistence/ReadDataQuery.service';
import { SavedDataQuery } from 'src/app/model/SavedDataQuery/SavedDataQuery';
import { SavedDataQueryListItemData } from 'src/app/model/Interface/SavedDataQueryListItemData';
import { SavedDataQueryService } from './Persistence/SaveDataQuery.service';
import { SavedUsageStats } from 'src/app/model/Types/SavedUsageStats';

@Injectable({
  providedIn: 'root',
})
export class DataQueryStorageService {
  constructor(
    private readDataQueryService: ReadDataQueryService,
    private deleteDataQueryService: DeleteDataQueryService,
    private saveDataQueryService: SavedDataQueryService
  ) {}

  public saveDataQuery(data: any): Observable<SavedUsageStats> {
    return this.saveDataQueryService.saveDataQuery(data);
  }

  public readDataQueries(): Observable<SavedDataQueryListItemData[]> {
    return this.readDataQueryService.readSavedQueries();
  }

  public deleteDataQueryById(id: number): Observable<any> {
    return this.deleteDataQueryService.deleteDataQueryById(id);
  }

  public readDataQueryById(id: number): Observable<SavedDataQuery> {
    return this.readDataQueryService.readDataQueryById(id);
  }
}
