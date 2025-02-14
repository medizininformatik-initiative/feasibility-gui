import { BackendService } from '../Backend.service';
import { ChunkedRequestService } from './ChunkedRequest.service';
import { DataSelectionPaths } from '../Paths/DataSelectionPaths';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionApiService {
  constructor(
    private http: HttpClient,
    private backendService: BackendService,
    private chunkedRequestService: ChunkedRequestService
  ) {}

  public getDataSelectionProfileData(ids: string[]) {
    const path = DataSelectionPaths.PROFILE_DATA_ENDPOINT;
    return this.chunkedRequestService.getChunkedRequest(ids, path);
  }

  public getDataSelectionProfileTree() {
    return this.http.get<any>(
      this.backendService.createUrl(DataSelectionPaths.PROFILE_TREE_ENDPOINT)
    );
  }
}
