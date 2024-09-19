import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSelectionPaths } from '../Paths/DataSelectionPaths';
import { NewBackendService } from '../NewBackend.service';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionApiService {
  private backendService: NewBackendService;

  constructor(private http: HttpClient) {}

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
