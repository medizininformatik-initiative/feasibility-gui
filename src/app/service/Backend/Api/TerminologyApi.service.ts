import { BackendService } from '../Backend.service';
import { ChunkedRequestService } from './ChunkedRequest.service';
import { CodeableConceptPaths } from '../Paths/CodeableConceptPaths';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TerminologyPaths } from '../Paths/TerminologyPaths';
import { CriteriaProfileData } from 'src/app/model/Interface/CriteriaProfileData';
import { ConceptData } from 'src/app/model/Interface/ConceptData';
import { UiProfileResponseData } from '../../../model/Interface/UiProfileResponseData';

@Injectable({
  providedIn: 'root',
})
export class TerminologyApiService {
  private readonly chunkSize = 50;

  constructor(
    private backendService: BackendService,
    private http: HttpClient,
    private chunkedRequestService: ChunkedRequestService
  ) {}

  public getSearchFilter(): Observable<Array<any>> {
    return this.http.get<any>(
      this.backendService.createUrl(TerminologyPaths.SEARCH_FILTER_ENDPOINT)
    );
  }

  public getCriteriaProfileData(ids: string[]): Observable<Array<CriteriaProfileData>> {
    return this.chunkedRequestService.getChunkedRequest(
      ids,
      TerminologyPaths.CRITERIA_PROFILE_ENDPOINT
    );
  }

  public getSearchTermEntryRelations(id: string): Observable<any> {
    return this.http.get<any>(
      this.backendService.createUrl(
        TerminologyPaths.ENTRY_ENDPOINT + '/' + id + TerminologyPaths.RELATIONS_ENDPOINT
      )
    );
  }

  public getElasticSearchResults(url: string): Observable<{ totalHits: number; results: any[] }> {
    const parsedUrl = this.backendService.createUrl(url);
    return this.http.get<{ totalHits: number; results: any[] }>(parsedUrl);
  }

  public getCodeableConceptsByIds(ids: string[]): Observable<Array<ConceptData>> {
    return this.chunkedRequestService.getChunkedRequest(
      ids,
      CodeableConceptPaths.ENTRY_CONCEPT_ENDPOINT
    );
  }

  public getEntryById(id: string): Observable<any> {
    return this.http.get<any>(
      this.backendService.createUrl(TerminologyPaths.ENTRY_ENDPOINT + '/' + id)
    );
  }

  public getTerminologySystems() {
    return this.http.get<any>(this.backendService.createUrl(TerminologyPaths.SYSTEMS_ENDPOINT));
  }

  public getUiProfileData(): Observable<UiProfileResponseData> {
    return this.http.get<UiProfileResponseData>(
      this.backendService.createUrl(TerminologyPaths.UIPROFILE_ENDPOINT)
    );
  }
}
