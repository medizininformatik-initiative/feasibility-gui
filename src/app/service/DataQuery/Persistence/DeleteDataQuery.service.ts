import { DataQueryApiService } from '../../Backend/Api/DataQueryApi.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteDataQueryService {
  constructor(private dataQueryApiService: DataQueryApiService) {}

  public deleteDataQueryById(id: number): Observable<any> {
    return this.dataQueryApiService.deleteDataQueryById(id);
  }
}
