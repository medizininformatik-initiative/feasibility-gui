import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendService } from '../Backend.service';
import { forkJoin, map, Observable } from 'rxjs';
import { TerminologyPaths } from '../Paths/TerminologyPaths';

@Injectable({
  providedIn: 'root',
})
export class TerminologyApiService {
  constructor(private backendService: BackendService, private http: HttpClient) {}

  public getSearchFilter(): Observable<Array<any>> {
    return this.http.get<any>(
      this.backendService.createUrl(TerminologyPaths.SEARCH_FILTER_ENDPOINT)
    );
  }

  public getCriteriaProfileData(commaSeparatedIds: string[]): Observable<Array<any>> {
    const chunkSize = 50;
    const chunks = this.backendService.chunkArray(commaSeparatedIds, chunkSize);
    const observables = chunks.map((chunk) => {
      const joinedIds = chunk.join(',');
      return this.http.get<Array<any>>(
        this.backendService.createUrl(TerminologyPaths.CRITERIA_PROFILE_ENDPOINT + joinedIds)
      );
    });
    return forkJoin(observables).pipe(map((results) => [].concat(...results)));
  }

  public getSearchTermEntryRelations(id: string): Observable<any> {
    console.log(id);
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

  public getEntryById(id: string): Observable<any> {
    return this.http.get<any>(
      this.backendService.createUrl(TerminologyPaths.ENTRY_ENDPOINT + '/' + id)
    );
  }

  public getTerminologySystems() {
    return this.http.get<any>(this.backendService.createUrl(TerminologyPaths.SYSTEMS_ENDPOINT));
  }
}
