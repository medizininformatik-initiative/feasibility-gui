import { BackendService } from '../Backend.service';
import { FeasibilityQueryPaths } from '../Paths/FeasibilityQueryPaths';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeasibilityQueryQuotaData } from 'src/app/model/Interface/FeasibilityQueryQuota';
import { QuotaLimitData } from 'src/app/model/Interface/QuotaLimitData';
import { SavedFeasibilityQueryResults } from 'src/app/model/Result/SavedFeasibilityQueryResults';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryApiService {
  constructor(private backendService: BackendService, private http: HttpClient) {}

  /**
   *
   * @param structuredQuery
   * @returns A string contained in the header response which is the location of the query result
   */
  public postStructuredQuery(structuredQuery: StructuredQuery): Observable<any> {
    return this.http.post<any>(
      this.backendService.createUrl(FeasibilityQueryPaths.EXECUTE_QUERY),
      structuredQuery,
      {
        observe: 'response',
      }
    );
  }

  public postSavedFeasibilityQuery(
    savedFeasibilityQuery: SavedFeasibilityQueryResults,
    feasibilityQueryResultID: string
  ): Observable<any> {
    const url =
      this.backendService.createUrl(FeasibilityQueryPaths.getBaseUrl()) +
      '/' +
      feasibilityQueryResultID +
      FeasibilityQueryPaths.SAVE_QUERY;

    return this.http.post<any>(url, savedFeasibilityQuery, {
      headers: this.backendService.getHeaders(),
      observe: 'response',
    });
  }

  public validateStructuredQuery(structuredQuery: StructuredQuery): Observable<any> {
    const url = FeasibilityQueryPaths.EXECUTE_QUERY + FeasibilityQueryPaths.VALIDATE;
    return this.http.post<any>(this.backendService.createUrl(url), structuredQuery, {
      headers: this.backendService.getHeaders(),
    });
  }

  public getStructuredQueryById(id: number): Observable<any> {
    const url = this.backendService.createUrl(
      FeasibilityQueryPaths.EXECUTE_QUERY + '/' + id.toString()
    );
    return this.http.get<any>(url, {
      headers: this.backendService.getHeaders(),
    });
  }

  public getSavedQuerySlotCount(): Observable<any> {
    const url = this.backendService.createUrl(FeasibilityQueryPaths.SAVED_QUERY_SLOTS_ENDPOINT);
    return this.http.get(url, {
      headers: this.backendService.getHeaders(),
    });
  }

  public getFeasibilityQueryQuota(): Observable<FeasibilityQueryQuotaData> {
    const url = this.backendService.createUrl(FeasibilityQueryPaths.QUOTA_ENDPOINT);
    return this.http.get<FeasibilityQueryQuotaData>(url, {
      headers: this.backendService.getHeaders(),
    });
  }

  public putFeasibilityQuery(id: number, updatedObject: object): Observable<any> {
    return this.http.put<any>(
      this.backendService.createUrl(
        FeasibilityQueryPaths.EXECUTE_QUERY + '/' + id.toString() + FeasibilityQueryPaths.SAVE_QUERY
      ),
      updatedObject,
      {
        headers: this.backendService.getHeaders(),
      }
    );
  }
}
