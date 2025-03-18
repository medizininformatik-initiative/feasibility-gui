import { Injectable } from '@angular/core';
import { SaveDataModal } from '../shared/models/SaveDataModal/SaveDataModalInterface';
import { SavedDataQueryService } from './DataQuery/Persistence/SaveDataQuery.service';

@Injectable({
  providedIn: 'root',
})
export class SaveDataQueryModalService {
  constructor(private saveDataQueryService: SavedDataQueryService) {}

  public saveDataQuery(data: SaveDataModal | null = null): void {
    this.saveDataQueryService.saveDataQuery(data);
  }
}
