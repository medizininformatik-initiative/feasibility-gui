import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBackendService } from '../NewBackend.service';
import { Observable } from 'rxjs';
import { TerminologyPaths } from '../Paths/TerminologyPaths';

@Injectable({
  providedIn: 'root',
})
export class TerminologyApiService {
  constructor(private backendService: NewBackendService, private http: HttpClient) {}

  public getElasticSearchEntry(id: string): Observable<any> {
    return this.http.get<any>(
      this.backendService.createUrl(TerminologyPaths.SEARCH_ENTRY_ENDPOINT + id)
    );
  }

  public getElasticSearchFilter(): Observable<Array<any>> {
    return this.http.get<any>(
      this.backendService.createUrl(TerminologyPaths.SEARCH_FILTER_ENDPOINT)
    );
  }

  public getCriteriaProfileData(commaSeparatedIds: string): Observable<Array<any>> {
    return this.http.get<Array<any>>(
      this.backendService.createUrl(TerminologyPaths.CRITERIA_PROFILE_ENDPOINT + commaSeparatedIds)
    );
  }

  public getSearchTermEntryRelations(id: string): Observable<any> {
    return this.http.get<any>(
      this.backendService.createUrl(
        TerminologyPaths.ENTRY_ENDPOINT + id + TerminologyPaths.RELATIONS_ENDPOINT
      )
    );
  }

  public getElasticSearchResults(url: string): Observable<{ totalHits: number; results: any[] }> {
    const parsedUrl = this.backendService.createUrl(url);
    return this.http.get<{ totalHits: number; results: any[] }>(parsedUrl);
  }

  public getElasticSearchResultById(id: string): Observable<any> {
    return this.http.get<any>(this.backendService.createUrl(TerminologyPaths.ENTRY_ENDPOINT + id));
  }

  public getTerminologySystems() {
    return this.http.get<any>(this.backendService.createUrl(TerminologyPaths.SYSTEMS_ENDPOINT));
  }
}
