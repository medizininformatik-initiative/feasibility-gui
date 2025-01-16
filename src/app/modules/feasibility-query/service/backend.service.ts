import { AnnotatedStructuredQuery } from 'src/app/model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { AppConfigService } from '../../../config/app-config.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { FeatureService } from '../../../service/Feature.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable, of, forkJoin, map } from 'rxjs';
import { QueryResultRateLimit } from 'src/app/model/Result/QueryResultRateLimit';
import { SearchTermListEntry } from '../../../shared/models/ListEntries/SearchTermListEntry';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';
import { QueryResponse } from 'src/app/model/Result/QueryResponse';
import { QueryResult } from '../../../model/Result/QueryResult';
@Injectable({
  providedIn: 'root',
})
/**
 *
 * @todo Create Interfaces for all HTTP Response Objects
 *
 */
export class BackendService {
  constructor(
    private config: AppConfigService,
    private feature: FeatureService,
    private http: HttpClient,
    private authStorage: OAuthStorage
  ) {}

  public static BACKEND_UUID_NAMESPACE = '00000000-0000-0000-0000-000000000000';
  private static PATH_TERMINOLOGY = 'terminology/';
  private static PATH_CRITERIA_SET_INTERSECT = 'terminology/criteria-set/intersect';
  private static PATH_SAVED = 'saved';
  private static PATH_TERMINOLOGY_SEARCH_CONCEPT = 'codeable-concept/entry/search';
  private static PATH_TERMINOLOGY_SEARCH = 'terminology/entry/search';
  private static PATH_TERMINOLOGY_SEARCH_FILTER = 'terminology/search/filter';
  private static PATH_CRITERIA_PROFILE = 'terminology/criteria-profile-data';

  private static PATH_ENTRY = 'terminology/entry/';
  private static PATH_RUN_QUERY = 'query';
  private static PATH_SAVED_QUERY_SLOTS = 'saved-query-slots';
  private static PATH_STORED_QUERY = 'query/template';
  private static PATH_QUERY_RESULT_LIMIT = 'query/detailed-obfuscated-result-rate-limit';
  public static MOCK_RESULT_URL = 'http://localhost:9999/result-of-query/12345';
  private static PATH_TERMINOLOGY_SYSTEMS = 'terminology/systems';

  private static PATH_SUMMARY_RESULT = 'summary-result';
  private static DETAILED_OBFUSCATED_RESULT = 'detailed-obfuscated-result';

  private resultObservable = null;

  private static PATH_DATASELECTION_PROFILE_DATA = 'dse/profile-data';
  private static PATH_DATASELECTION_PROFILE_TREE = 'dse/profile-tree';

  lowerBoundaryPatient: number = this.feature.getPatientResultLowerBoundary();

  token = this.authStorage.getItem('access_token');
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token);

  /*
  public getElasticSearchEntry(id: string): Observable<SearchTermListEntry> {
    return this.http.get<SearchTermListEntry>(this.createUrl(BackendService.PATH_ENTRY + '/' + id));
  }

  public getAllowedReferencedCriteria(
    criteriaSetUrl: string,
    contextTermCodeHashes: Array<string>
  ): Observable<any> {
    const criteriaSetUrlParam = 'criteriaSetUrl=' + encodeURI(criteriaSetUrl);

    return this.http.post<any>(
      this.createUrl(BackendService.PATH_CRITERIA_SET_INTERSECT, criteriaSetUrlParam),
      contextTermCodeHashes
    );
  }

  public getTerminologyProfile(contextTermcodeHash: string): Observable<any> {
    return this.http.get<any>(
      this.createUrl(BackendService.PATH_TERMINOLOGY + contextTermcodeHash + '/ui_profile')
    );
  }

  public getElasticSearchFilter(): Observable<Array<any>> {
    return this.http.get<any>(this.createUrl(BackendService.PATH_TERMINOLOGY_SEARCH_FILTER));
  }

  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  public getCriteriaProfileData(ids: Array<string>): Observable<Array<CriteriaProfileData>> {
    const chunkSize = 50;
    const chunks = this.chunkArray(ids, chunkSize);

    const observables = chunks.map((chunk) => {
      const commaSeparatedIds = chunk.join(',');
      return this.http.get<Array<CriteriaProfileData>>(
        this.createUrl(BackendService.PATH_CRITERIA_PROFILE + '?ids=' + commaSeparatedIds)
      );
    });

    return forkJoin(observables).pipe(map((results) => [].concat(...results)));
  }

  public getSearchTermEntryRelations(id: string): Observable<SearchTermRelatives> {
    return this.http.get<SearchTermRelatives>(
      this.createUrl(BackendService.PATH_ENTRY + id + '/relations')
    );
  }

  public getElasticSearchResultsForCriteria(
    searchString: string,
    availability?: string,
    context?: string,
    kds?: string,
    terminologies?: string,
    limit: number = 100,
    offset?: number
  ): Observable<{ totalHits: number; results: any[] }> {
    const contextParameter = context ? '&contexts=' + context : '';
    const terminologyParameter = terminologies ? '&terminologies=' + terminologies : '';
    const kdsParameter = kds ? '&kds-modules=' + kds : '';
    const availabilityParameter = availability ? '&availability=' + availability : '';
    const limitParameter = limit ? '&page-size=' + limit : '';
    const offsetParameter = offset ? '&page=' + offset : '';
    return this.http.get<{ totalHits: number; results: any[] }>(
      this.createUrl(
        BackendService.PATH_TERMINOLOGY_SEARCH +
          '?searchterm=' +
          searchString +
          contextParameter +
          terminologyParameter +
          kdsParameter +
          availabilityParameter +
          limitParameter +
          offsetParameter
      )
    );
  }

  public getElasticSearchResultsForCodeableConcept(
    searchString: string,
    valueSets: string[],
    limit?: number,
    offset?: number
  ): Observable<{ totalHits: number; results: any[] }> {
    const limitParameter = limit ? '&page-size=' + limit : '';
    const offsetParameter = offset ? '&page=' + offset : '';
    const encodedCommaSeperatedValueSets = '&value-sets=' + encodeURI([valueSets].join(','));
    return this.http.get<{ totalHits: number; results: any[] }>(
      this.createUrl(
        BackendService.PATH_TERMINOLOGY_SEARCH_CONCEPT +
          '?searchterm=' +
          searchString +
          limitParameter +
          offsetParameter +
          encodedCommaSeperatedValueSets
      )
    );
  }

  public getElasticSearchResultsForCriteriaSets(
    searchString: string,
    criteriaSets: string[],
    limit?: number,
    offset?: number
  ): Observable<{ totalHits: number; results: any[] }> {
    const limitParameter = limit ? '&page-size=' + limit : '';
    const offsetParameter = offset ? '&page=' + offset : '';

    const encodedCommaSeperatedCriteriaSets =
      '&criteria-sets=' + encodeURI([criteriaSets].join(','));
    return this.http.get<{ totalHits: number; results: any[] }>(
      this.createUrl(
        BackendService.PATH_TERMINOLOGY_SEARCH +
          '?searchterm=' +
          searchString +
          limitParameter +
          offsetParameter +
          encodedCommaSeperatedCriteriaSets
      )
    );
  }



 public getElasticSearchResultById(id: string): Observable<any> {
   return this.http.get<any>(this.createUrl(BackendService.PATH_ENTRY + id));
  }

  */

  public postQueryNew(query: StructuredQuery): Observable<any> {
    return this.http.post<QueryResponse>(this.createUrl(BackendService.PATH_RUN_QUERY), query, {
      observe: 'response',
    });
  }

  public getDataSelectionProfileData(commaSeparatedIds: string) {
    return this.http.get<any>(
      this.createUrl(BackendService.PATH_DATASELECTION_PROFILE_DATA + '?ids=' + commaSeparatedIds)
    );
  }

  public getTerminologySystems() {
    return this.http.get<any>(this.createUrl(BackendService.PATH_TERMINOLOGY_SYSTEMS));
  }

  public getDataSelectionProfileTree() {
    return this.http.get<any>(this.createUrl(BackendService.PATH_DATASELECTION_PROFILE_TREE));
  }

  public getSummaryResult(
    feasibilityQueryResultId: string,
    gottenDetailedResult: boolean
  ): Observable<any> {
    if (gottenDetailedResult) {
      return this.resultObservable;
    }
    const url =
      BackendService.PATH_RUN_QUERY +
      '/' +
      feasibilityQueryResultId +
      '/' +
      BackendService.PATH_SUMMARY_RESULT;
    const result = this.http.get<any>(this.createUrl(url));

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

  public getDetailedObfuscatedResult(
    feasibilityQueryResultId: string,
    gottenDetailedResult: boolean
  ): Observable<any> {
    if (gottenDetailedResult) {
      return this.resultObservable;
    }
    const url =
      BackendService.PATH_RUN_QUERY +
      '/' +
      feasibilityQueryResultId +
      '/' +
      BackendService.DETAILED_OBFUSCATED_RESULT;
    const result = this.http.get<any>(this.createUrl(url));

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

  public saveQuery(queryResult: QueryResult, title: string, comment: string): Observable<any> {
    const headers = this.headers;
    const savedQuery = {
      label: title,
      comment,
      totalNumberOfPatients: queryResult.getTotalNumberOfPatients(),
    };
    return this.http.post<any>(
      this.createUrl(BackendService.PATH_RUN_QUERY) +
        '/' +
        queryResult.getId() +
        '/' +
        BackendService.PATH_SAVED,
      savedQuery,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public validateStructuredQueryBackend(
    structuredQuery: StructuredQuery
  ): Observable<AnnotatedStructuredQuery> {
    const headers = this.headers;
    const requestBody = structuredQuery;
    const url = BackendService.PATH_RUN_QUERY + '/validate';
    return this.http.post<AnnotatedStructuredQuery>(this.createUrl(url), requestBody, { headers });
  }

  public loadSavedQueries(validate?: boolean): Observable<any> {
    const headers = this.headers;
    const url = validate === false ? '&skip-validation=true' : '';
    return this.http.get<Array<any>>(
      this.createUrl(BackendService.PATH_RUN_QUERY, 'filter=saved' + url),
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
  public deleteSavedTemplate(id: number) {
    const headers = this.headers;
    const url = this.createUrl(BackendService.PATH_STORED_QUERY + '/' + id);
    return this.http.delete<any>(url, {
      headers,
    });
  }

  public loadStructuredQuery(id: number): Observable<any> {
    const headers = this.headers;
    const url = this.createUrl(BackendService.PATH_RUN_QUERY + '/' + id.toString());
    return this.http.get<any>(url, {
      headers,
    });
  }

  public deleteSavedQuery(id: number): Observable<any> {
    const headers = this.headers;
    const url = this.createUrl(
      BackendService.PATH_RUN_QUERY + '/' + id + '/' + BackendService.PATH_SAVED
    );
    return this.http.delete<any>(url, {
      headers,
    });
  }

  public getSavedQuerySlotCount(): Observable<any> {
    const headers = this.headers;
    const url = this.createUrl(
      BackendService.PATH_RUN_QUERY + '/' + BackendService.PATH_SAVED_QUERY_SLOTS
    );
    return this.http.get(url, {
      headers,
    });
  }

  // public loadTemplate(id: number): Observable<StructuredQueryInquiry> {
  //   const headers = this.headers;
  //   return this.http.get<SavedFea>(
  //     this.createUrl(BackendService.PATH_STORED_QUERY + '/' + id.toString()),
  //     { headers }
  //   );
  // }

  public updateTemplate(id: number, updatedObject: object): Observable<any> {
    const headers = this.headers;
    const requestBody = updatedObject;
    return this.http.put<any>(
      this.createUrl(BackendService.PATH_STORED_QUERY + '/' + id.toString()),
      requestBody,
      {
        headers,
      }
    );
  }

  public updateQuery(id: number, updatedObject: object): Observable<any> {
    const headers = this.headers;
    const requestBody = updatedObject;
    return this.http.put<any>(
      this.createUrl(
        BackendService.PATH_RUN_QUERY + '/' + id.toString() + '/' + BackendService.PATH_SAVED
      ),
      requestBody,
      {
        headers,
      }
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
      if (result) {
        if (result <= this.lowerBoundaryPatient) {
          return '< ' + this.lowerBoundaryPatient.toString();
        } else {
          return result.toString();
        }
      }
    }
  }
}
