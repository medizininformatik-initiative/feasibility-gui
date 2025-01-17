import { BackendService } from '../Backend.service';
import { DataSelectionPaths } from '../Paths/DataSelectionPaths';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionApiService {
  constructor(private http: HttpClient, private backendService: BackendService) {}

  public getDataSelectionProfileData(commaSeparatedIds: string) {
    return this.http.get<any>(
      this.backendService.createUrl(DataSelectionPaths.PROFILE_DATA_ENDPOINT + commaSeparatedIds)
    );
  }

  public getDataSelectionProfileTree() {
    return this.http.get<any>(
      this.backendService.createUrl(DataSelectionPaths.PROFILE_TREE_ENDPOINT)
    );
  }
}
