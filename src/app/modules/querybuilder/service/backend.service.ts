import { AppConfigService } from '../../../config/app-config.service';
//import { CategoryEntry, TerminologyEntry } from 'src/app/model/terminology/Terminology';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { FeatureService } from '../../../service/Feature.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
//import { QueryProviderService } from './query-provider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
//import { QueryProviderService } from './query-provider.service';
import { QueryResponse } from '../model/api/result/QueryResponse';
import { SearchTermFilter } from '../../../model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';
import { StructuredQueryInquiry } from '../../../model/SavedInquiry/StructuredQueryInquiry';
import { StructuredQueryTemplate } from 'src/app/model/SavedInquiry/StructuredQuery/StructuredQueryTemplate';
import { SearchTermListEntry } from '../../../shared/models/ListEntries/SearchTermListEntry';
import { QueryResultRateLimit } from 'src/app/model/Result/QueryResultRateLimit';
import { AnnotatedStructuredQuery } from 'src/app/model/Result/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private config: AppConfigService,
    private feature: FeatureService,
    //private queryProviderService: QueryProviderService,
    //private queryProviderService: QueryProviderService,
    private http: HttpClient,
    private authStorage: OAuthStorage //private apiTranslator: UIQuery2StructuredQueryTranslatorService, //private latestQueryResult: QueryProviderService
  ) {}

  public static BACKEND_UUID_NAMESPACE = '00000000-0000-0000-0000-000000000000';
  private static PATH_ROOT_ENTRIES = 'terminology/categories';
  private static PATH_TERMINOLOGY_SUBTREE = 'terminology/entries';
  private static PATH_TERMINOLOGY = 'terminology/';
  private static PATH_SEARCH = 'terminology/entries';
  private static PATH_CRITERIA_SET_INTERSECT = 'terminology/criteria-set/intersect';
  private static PATH_SAVED = 'saved';
  private static PATH_TERMINOLOGY_SEARCH_CONCEPT = 'codeable_concept/entry/search';
  private static PATH_TERMINOLOGY_SEARCH = 'terminology/entry/search';
  private static PATH_TERMINOLOGY_SEARCH_FILTER = 'terminology/search/filter';
  private static PATH_CRITERIA_PROFILE = 'terminology/criteria-profile-data';

  private static PATH_ENTRY = 'terminology/entry/';
  private static PATH_RUN_QUERY = 'query';
  private static PATH_SAVED_QUERY_SLOTS = 'saved-query-slots';
  private static PATH_STORED_QUERY = 'query/template';
  private static PATH_QUERY_RESULT_LIMIT = 'query/detailed-obfuscated-result-rate-limit';
  public static MOCK_RESULT_URL = 'http://localhost:9999/result-of-query/12345';
  private resultObservable = null;

  private static PATH_DATASELECTION_PROFILE_DATA = 'dse/profile-data';

  lowerBoundaryPatient: number = this.feature.getPatientResultLowerBoundary();

  token = this.authStorage.getItem('access_token');
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token);
  /*
  public getCategories(): Observable<Array<CategoryEntry>> {
    if (this.feature.mockTerminology()) {
      return of();
    }
    return this.http.get<Array<CategoryEntry>>(this.createUrl(BackendService.PATH_ROOT_ENTRIES));
  }

  public getTerminolgyTree(id: string): Observable<TerminologyEntry> {
    if (this.feature.mockTerminology()) {
      return of();
    }

    return this.http.get<TerminologyEntry>(
      this.createUrl(BackendService.PATH_TERMINOLOGY_SUBTREE + '/' + id)
    );
  }
*/
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

  public getElasticSearchFilter(): Observable<Array<SearchTermFilter>> {
    return this.http.get<Array<SearchTermFilter>>(
      this.createUrl(BackendService.PATH_TERMINOLOGY_SEARCH_FILTER)
    );
  }

  public getCriteriaProfileData(ids: Array<string>): Observable<Array<CriteriaProfileData>> {
    const commaSeparatedIds: string = ids.join(',');
    return this.http.get<Array<CriteriaProfileData>>(
      this.createUrl(BackendService.PATH_CRITERIA_PROFILE + '?id=' + commaSeparatedIds)
    );
  }

  public getSearchTermEntryRelations(id: string): Observable<SearchTermRelatives> {
    return this.http.get<SearchTermRelatives>(
      this.createUrl(BackendService.PATH_ENTRY + id + '/relations')
    );
  }

  /**
   *
   * @param searchString
   * @param context
   * @param terminology
   * @param kds
   * @param availability
   * @param limit
   * @param offset
   * @returns
   * offset optional?
   */
  public getElasticSearchResultsForCriteria(
    searchString: string,
    url?: string,
    context?: string,
    terminology?: string,
    kds?: string,
    availability?: number,
    limit?: number,
    offset?: number
  ): Observable<{ totalHits: number; results: any[] }> {
    const contextParameter = context ? '&context=' + context : '';
    const terminologyParameter = terminology ? '&terminology=' + terminology : '';
    const kdsParameter = kds ? '&kds=' + kds : '';
    const availabilityParameter = availability ? '&availability=' + availability : '';
    const limitParameter = limit ? '&pageSize=' + limit : '';
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
    const limitParameter = limit ? '&pageSize=' + limit : '';
    const offsetParameter = offset ? '&page=' + offset : '';
    const encodedCommaSeperatedValueSets = '&valueSets' + encodeURI([valueSets].join(','));
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
    const limitParameter = limit ? '&pageSize=' + limit : '';
    const offsetParameter = offset ? '&page=' + offset : '';

    const encodedCommaSeperatedCriteriaSets = '&criteriaSets=' + encodeURI([criteriaSets].join(','));
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

  /**
   *
   *
   * @param id
   * @returns
   */
  public getElasticSearchResultById(id: string): Observable<any> {
    return this.http.get<any>(this.createUrl(BackendService.PATH_ENTRY + id));
  }
  /*
  public getTerminolgyEntrySearchResult(
    catId: string,
    search: string
  ): Observable<Array<TerminologyEntry>> {
    if (this.feature.mockTerminology()) {
      return of();
    }

    const queryParam = 'query=' + search.toUpperCase() + (catId ? '&categoryId=' + catId : '');
    const url = this.createUrl(BackendService.PATH_SEARCH, queryParam);

    return this.http.get<Array<TerminologyEntry>>(url);
  }
*/
  /*
  public postQuery(query: FeasibilityQuery): Observable<any> {
    if (this.feature.getQueryVersion() === 'v2') {
      const queryV2 = this.apiTranslator.translateToStructuredQuery(query);
      return this.http.post<QueryResponse>(this.createUrl(BackendService.PATH_RUN_QUERY), queryV2, {
        observe: 'response',
      });
    }
  }*/
  public postQueryNew(query: StructuredQuery): Observable<any> {
    return this.http.post<QueryResponse>(this.createUrl(BackendService.PATH_RUN_QUERY), query, {
      observe: 'response',
    });
  }
  public getSummaryResult(resultUrl: string): Observable<any> {
    if (this.feature.mockResult()) {
      const result = {
        totalNumberOfPatients: Math.floor(Math.random() * 10000000),
        queryId: '12345',
        resultLines: [],
      };

      return of(result);
    }

    return this.http.get<any>(resultUrl);
  }

  public getDataSelectionProfileData(ids: string[]) {
    console.log(ids);
    const commaSeparatedIds: string = ids.join(',');
    const test = BackendService.PATH_DATASELECTION_PROFILE_DATA + '?ids=' + commaSeparatedIds;
    console.log(test);
    return this.http.get<any>(
      this.createUrl(BackendService.PATH_DATASELECTION_PROFILE_DATA + '?ids=' + commaSeparatedIds)
    );
  }

  public getDetailedResult(resultUrl: string, gottenDetailedResult: boolean): Observable<any> {
    /*if (this.feature.mockResult()) {
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
    }*/
    if (gottenDetailedResult) {
      return this.resultObservable;
    }

    const result = this.http.get<any>(resultUrl);

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
    const headers = this.headers;
    const requestBody = structuredQuery;
    const url = BackendService.PATH_RUN_QUERY + '/validate';
    return this.http.post<AnnotatedStructuredQuery>(this.createUrl(url), requestBody, { headers });
  }

  public loadSavedQueries(validate?: boolean): Observable<any> {
    const headers = this.headers;
    const url = validate === false ? '&skipValidation=true' : '';
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
      const url = validate === false ? '?skipValidation=true' : '';
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

  public loadStructuredQuery(id: number): Observable<StructuredQueryInquiry> {
    const headers = this.headers;
    const url = this.createUrl(BackendService.PATH_RUN_QUERY + '/' + id.toString());
    return this.http.get<StructuredQueryInquiry>(url, {
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

  public loadTemplate(id: number): Observable<StructuredQueryInquiry> {
    const headers = this.headers;
    return this.http.get<StructuredQueryInquiry>(
      this.createUrl(BackendService.PATH_STORED_QUERY + '/' + id.toString()),
      { headers }
    );
  }

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
