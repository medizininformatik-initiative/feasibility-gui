import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryEntry, TerminologyEntry } from '../model/api/terminology/terminology';
import { AppConfigService } from '../../../config/app-config.service';
import { Observable, of } from 'rxjs';
import { FeatureService } from '../../../service/feature.service';
import { Query } from '../model/api/query/query';
import { QueryResponse } from '../model/api/result/QueryResponse';
import { QueryResult } from '../model/api/result/QueryResult';
import { MockBackendDataProvider } from './MockBackendDataProvider';
import { ApiTranslator } from '../controller/ApiTranslator';
import { QueryProviderService } from './query-provider.service';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { QueryResultRateLimit } from '../model/api/result/QueryResultRateLimit';
import { v3 as uuidv3 } from 'uuid';
import { Criterion } from '../model/api/query/criterion';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private config: AppConfigService,
    private feature: FeatureService,
    private queryProviderService: QueryProviderService,
    private http: HttpClient,
    private authStorage: OAuthStorage,
    private apiTranslator: ApiTranslator
  ) {}

  private static BACKEND_UUID_NAMESPACE = '00000000-0000-0000-0000-000000000000';
  private static PATH_ROOT_ENTRIES = 'terminology/categories';
  private static PATH_TERMINOLOGY_SUBTREE = 'terminology/entries';
  private static PATH_TERMINOLOGY = 'terminology/';
  private static PATH_SEARCH = 'terminology/entries';

  private static PATH_RUN_QUERY = 'query';
  private static PATH_STORED_QUERY = 'query/template';
  private static PATH_QUERY_RESULT_LIMIT = 'query/detailed-obfuscated-result-rate-limit';
  public static MOCK_RESULT_URL = 'http://localhost:9999/result-of-query/12345';
  private storedResult = null;
  private resultObservable = null;

  private readonly mockBackendDataProvider = new MockBackendDataProvider();
  lowerBoundaryPatient: number = this.feature.getPatientResultLowerBoundary();

  token = this.authStorage.getItem('access_token');
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token);

  public getCategories(): Observable<Array<CategoryEntry>> {
    if (this.feature.mockTerminology()) {
      return of(this.mockBackendDataProvider.getCategoryEntries());
    }
    return this.http.get<Array<CategoryEntry>>(this.createUrl(BackendService.PATH_ROOT_ENTRIES));
  }

  public getTerminolgyTree(id: string): Observable<TerminologyEntry> {
    if (this.feature.mockTerminology()) {
      return of(this.mockBackendDataProvider.getTerminologyEntry(id));
    }

    return this.http.get<TerminologyEntry>(
      this.createUrl(BackendService.PATH_TERMINOLOGY_SUBTREE + '/' + id)
    );
  }

  public getTerminologyProfile(criterion: Criterion): Observable<any> {
    const context = criterion.context;
    const termcode = criterion.termCodes[0];
    let contextVersion = '';
    let termcodeVersion = '';

    if (context.version) {
      contextVersion = criterion.context.version;
    }

    if (termcode.version) {
      termcodeVersion = termcode.version;
    }

    const contextTermcodeHashInput =
      context.system +
      context.code +
      contextVersion +
      termcode.system +
      termcode.code +
      termcodeVersion;
    const contextTermcodeHash = uuidv3(
      contextTermcodeHashInput,
      BackendService.BACKEND_UUID_NAMESPACE
    );

    return this.http.get<any>(
      this.createUrl(BackendService.PATH_TERMINOLOGY + contextTermcodeHash + '/ui_profile')
    );
  }

  public getTerminolgyEntrySearchResult(
    catId: string,
    search: string
  ): Observable<Array<TerminologyEntry>> {
    if (this.feature.mockTerminology()) {
      return of(this.mockBackendDataProvider.getTerminolgyEntrySearchResult(catId, search));
    }

    const queryParam = 'query=' + search.toUpperCase() + (catId ? '&categoryId=' + catId : '');
    const url = this.createUrl(BackendService.PATH_SEARCH, queryParam);

    return this.http.get<Array<TerminologyEntry>>(url);
  }

  public postQuery(query: Query): Observable<any> {
    if (this.feature.mockQuery()) {
      return of({ location: BackendService.MOCK_RESULT_URL });
    }

    if (this.feature.getQueryVersion() === 'v1') {
      const queryV1 = this.apiTranslator.translateToV1(query);
      return this.http.post<QueryResponse>(this.createUrl(BackendService.PATH_RUN_QUERY), queryV1);
    }
    if (this.feature.getQueryVersion() === 'v2') {
      const queryV2 = this.apiTranslator.translateToV2(query);
      return this.http.post<QueryResponse>(this.createUrl(BackendService.PATH_RUN_QUERY), queryV2, {
        observe: 'response',
      });
    }
  }

  public getSummaryResult(resultUrl: string): Observable<QueryResult> {
    if (this.feature.mockResult()) {
      const result = {
        totalNumberOfPatients: Math.floor(Math.random() * 10000000),
        queryId: '12345',
        resultLines: [],
      };

      return of(result);
    }

    return this.http.get<QueryResult>(resultUrl);
  }

  public getDetailedResult(
    resultUrl: string,
    gottenDetailedResult: boolean
  ): Observable<QueryResult> {
    if (this.feature.mockResult()) {
      const mockResult = {
        totalNumberOfPatients: Math.floor(Math.random() * 10000000),
        queryId: '12345',
        resultLines: [
          { siteName: 'Standort 1', numberOfPatients: 351 },
          { siteName: 'Standort 2', numberOfPatients: 1277 },
          { siteName: 'Standort 3', numberOfPatients: 63000000 },
          { siteName: 'Standort 4', numberOfPatients: 0 },
        ],
      };

      return of(mockResult);
    }

    if (gottenDetailedResult) {
      return this.resultObservable;
    }

    const result = this.http.get<QueryResult>(resultUrl);

    return Observable.create((obs: any) => {
      result.subscribe(
        (queryResult) => {
          this.resultObservable = Observable.create((queryResultObs: any) => {
            queryResultObs.next(queryResult);
            queryResultObs.complete();
          });
          obs.next(queryResult);
          obs.complete();
        },
        (error) => {
          this.resultObservable = Observable.create((innerObs: any) => {
            innerObs.error(error);
            innerObs.complete();
          });
          obs.error(error);
          obs.complete();
        }
      );
    });
  }

  public getDetailedResultRateLimit(): Observable<QueryResultRateLimit> {
    return this.http.get<QueryResultRateLimit>(
      this.createUrl(BackendService.PATH_QUERY_RESULT_LIMIT)
    );
  }

  public saveQuery(
    query: Query,
    title: string,
    comment: string,
    saveWithQuery: boolean | string
  ): Observable<any> {
    if (this.feature.mockLoadnSave()) {
      let savedQueries: Array<{
        content: Query
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
      if (this.feature.getQueryVersion() === 'v1') {
        const savedQuery = {
          label: title,
          comment,
          content: this.apiTranslator.translateToV1(query),
        };
        return this.http.post<any>(this.createUrl(BackendService.PATH_STORED_QUERY), savedQuery, {
          headers,
        });
      }
      if (this.feature.getQueryVersion() === 'v2') {
        if (saveWithQuery === false) {
          const savedQuery = {
            label: title,
            comment,
            content: this.apiTranslator.translateToV2(query),
          };
          return this.http.post<any>(this.createUrl(BackendService.PATH_STORED_QUERY), savedQuery, {
            headers,
            observe: 'response',
          });
        } else {
          const savedQuery = {
            label: title,
            comment,
          };
          return this.http.post<any>(
            this.createUrl(BackendService.PATH_RUN_QUERY) + '/' + saveWithQuery + '/saved',
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

  public loadSavedQueries(): Observable<any> {
    const headers = this.headers;
    return this.http.get<Array<any>>(
      this.createUrl(BackendService.PATH_RUN_QUERY, 'filter=saved'),
      {
        headers,
      }
    );
  }

  public loadSavedTemplates(validate?: boolean): Observable<any> {
    if (this.feature.mockLoadnSave()) {
      return of(this.queryProviderService.loadQueries());
    } else {
      const headers = this.headers;
      const url = validate ? '/validate' : '';
      return this.http.get<Array<any>>(this.createUrl(BackendService.PATH_STORED_QUERY + url), {
        headers,
      });
    }
  }

  public loadQuery(id: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(this.createUrl(BackendService.PATH_RUN_QUERY + '/' + id.toString()), {
      headers,
    });
  }

  public loadTemplate(id: number): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(
      this.createUrl(BackendService.PATH_STORED_QUERY + '/' + id.toString()),
      { headers }
    );
  }
  createUrl(pathToResource: string, paramString?: string): string {
    let url = this.config.getConfig().uiBackendApi.baseUrl;

    if (!url.endsWith('/')) {
      url += '/';
    }

    url += pathToResource;

    if (paramString) {
      url += '?' + paramString;
    }

    return url;
  }

  obfuscateResult(result: number): string {
    if (result === 0) {
      return '0';
    } else {
      if (result <= this.lowerBoundaryPatient) {
        return '< ' + this.lowerBoundaryPatient.toString();
      } else {
        return result.toString();
      }
    }
  }
}
