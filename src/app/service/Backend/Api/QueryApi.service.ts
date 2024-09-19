import { AnnotatedStructuredQuery } from 'src/app/model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBackendService } from '../NewBackend.service';
import { Observable, of } from 'rxjs';
import { QueryPaths } from '../Paths/QueryPaths';
import { QueryResponse } from 'src/app/model/Result/QueryResponse';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';
import { StructuredQueryInquiry } from 'src/app/model/SavedFeasibilityQuery/SavedAnnotatedFeasibilityQuery';

@Injectable({
  providedIn: 'root',
})
export class QueryApiService {
  constructor(private backendService: NewBackendService, private http: HttpClient) {}

  public postQueryNew(query: StructuredQuery): Observable<any> {
    return this.http.post<QueryResponse>(
      this.backendService.createUrl(QueryPaths.EXECUTE_QUERY),
      query,
      {
        observe: 'response',
      }
    );
  }

  /*
      /*
      public saveQuery(
        query: FeasibilityQuery,
        title: string,
        comment: string,
        saveWithQuery: boolean | string
      ): Observable<any> {
        if (this.feature.mockLoadnSave()) {
          let savedQueries: Array<{
            content: FeasibilityQuery
            label: string
            comment: string
            lastModified: number
          }> = [];
          savedQueries = this.queryProviderService.loadQueries();
          if (savedQueries === undefined) {
            savedQueries = [];
          }
          savedQueries.push({
            content: query,
            label: title,
            comment,
            lastModified: Date.now(),
          });
          this.queryProviderService.saveQueries(savedQueries);
          return of({ location: BackendService.MOCK_RESULT_URL });
        } else {
          const headers = this.headers;
          if (this.feature.getQueryVersion() === 'v2') {
            if (saveWithQuery === false) {
              const savedQuery = {
                label: title,
                comment,
                //content: this.apiTranslator.translateToStructuredQuery(query),
              };
              return this.http.post<any>(this.createUrl(BackendService.PATH_STORED_QUERY), savedQuery, {
                headers,
                observe: 'response',
              });
            } else {
              const savedQuery = {
                label: title,
                comment,
                totalNumberOfPatients: this.latestQueryResult.getQueryResult().totalNumberOfPatients,
              };
              return this.http.post<any>(
                this.createUrl(BackendService.PATH_RUN_QUERY) +
                  '/' +
                  this.latestQueryResult.getQueryResult().queryId +
                  '/' +
                  BackendService.PATH_SAVED,
                savedQuery,
                {
                  headers,
                  observe: 'response',
                }
              );
            }
          }
        }
      }
    */
  public validateStructuredQueryBackend(
    structuredQuery: StructuredQuery
  ): Observable<AnnotatedStructuredQuery> {
    const headers = this.backendService.getHeaders();
    const requestBody = structuredQuery;
    const url = QueryPaths.EXECUTE_QUERY + '/validate';
    return this.http.post<AnnotatedStructuredQuery>(
      this.backendService.createUrl(url),
      requestBody,
      { headers }
    );
  }

  public loadSavedQueries(validate?: boolean): Observable<any> {
    const headers = this.backendService.getHeaders();
    const url = validate === false ? '&skip-validation=true' : '';
    return this.http.get<Array<any>>(
      this.backendService.createUrl(QueryPaths.EXECUTE_QUERY, 'filter=saved' + url),
      {
        headers,
      }
    );
  }
  /*
      public loadSavedTemplates(validate?: boolean): Observable<StructuredQueryTemplate[]> {
        if (this.feature.mockLoadnSave()) {
          return of(this.queryProviderService.loadQueries());
        } else {
          const headers = this.headers;
          const url = validate === false ? '?skip-validation=true' : '';
          return this.http.get<Array<StructuredQueryTemplate>>(
            this.createUrl(BackendService.PATH_STORED_QUERY + url),
            {
              headers,
            }
          );
        }
      }
    */

  public loadStructuredQuery(id: number): Observable<StructuredQueryInquiry> {
    const headers = this.backendService.getHeaders();
    const url = this.backendService.createUrl(QueryPaths.EXECUTE_QUERY + '/' + id.toString());
    return this.http.get<StructuredQueryInquiry>(url, {
      headers,
    });
  }

  public deleteSavedQuery(id: number): Observable<any> {
    const headers = this.backendService.getHeaders();
    const url = this.backendService.createUrl(
      QueryPaths.EXECUTE_QUERY + '/' + id + '/' + QueryPaths.SAVE_QUERY
    );
    return this.http.delete<any>(url, {
      headers,
    });
  }

  public getSavedQuerySlotCount(): Observable<any> {
    const headers = this.backendService.getHeaders();
    const url = this.backendService.createUrl(
      QueryPaths.EXECUTE_QUERY + '/' + QueryPaths.SAVED_QUERY_SLOTS_ENDPOINT
    );
    return this.http.get(url, {
      headers,
    });
  }

  public updateQuery(id: number, updatedObject: object): Observable<any> {
    const headers = this.backendService.getHeaders();
    const requestBody = updatedObject;
    return this.http.put<any>(
      this.backendService.createUrl(
        QueryPaths.EXECUTE_QUERY + '/' + id.toString() + '/' + QueryPaths.SAVE_QUERY
      ),
      requestBody,
      {
        headers,
      }
    );
  }
}
