import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CategoryEntry, TerminologyEntry } from '../model/api/terminology/terminology'
import { AppConfigService } from '../../../config/app-config.service'
import { Observable, of } from 'rxjs'
import { FeatureService } from '../../../service/feature.service'
import { Query, QueryResponse } from '../model/api/query/query'
import { QueryResult } from '../model/api/result/QueryResult'

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private static PATH_ROOT_ENTRIES = 'root-entries'
  private static PATH_TERMINOLOGY_SUBTREE = 'entries'
  private static PATH_SEARCH = 'selectable-entries'
  private static PATH_RUN_QUERY = 'run-query'

  public static MOCK_QUERY_RESULT: QueryResult = {
    id: '12345',
    url: 'http://localhost:9999/result-of-query/12345',
    numberOfPatients: 31415,
  }
  public static MOCK_RESULT_URL = 'http://localhost:9999/result-of-query/12345'

  constructor(
    private config: AppConfigService,
    private feature: FeatureService,
    private http: HttpClient
  ) {}

  public getCategories(): Observable<Array<CategoryEntry>> {
    if (this.feature.mockTerminology()) {
      return of(new Array<CategoryEntry>())
    }

    return this.http.get<Array<CategoryEntry>>(this.createUrl(BackendService.PATH_ROOT_ENTRIES))
  }

  public getTerminolgyTree(id: string): Observable<TerminologyEntry> {
    if (this.feature.mockTerminology()) {
      return of(new TerminologyEntry())
    }

    return this.http.get<TerminologyEntry>(
      this.createUrl(BackendService.PATH_TERMINOLOGY_SUBTREE + '/' + id)
    )
  }

  public getTerminolgyEntrySearchResult(search: string): Observable<Array<TerminologyEntry>> {
    if (this.feature.mockTerminology()) {
      return of(new Array<TerminologyEntry>())
    }

    return this.http.get<Array<TerminologyEntry>>(
      this.createUrl(BackendService.PATH_SEARCH, 'q=' + search)
    )
  }

  public postQuery(query: Query): Observable<QueryResponse> {
    if (this.feature.mockQuery()) {
      return of({ location: BackendService.MOCK_RESULT_URL })
    }

    return this.http.post<QueryResponse>(this.createUrl(BackendService.PATH_RUN_QUERY), query)
  }

  public getResult(resultUrl: string): Observable<QueryResult> {
    if (this.feature.mockResult()) {
      return of(BackendService.MOCK_QUERY_RESULT)
    }

    return this.http.get<QueryResult>(resultUrl)
  }

  createUrl(pathToResource: string, paramString?: string): string {
    let url = this.config.getConfig().uiBackendApi.baseUrl

    if (!url.endsWith('/')) {
      url += '/'
    }

    url += pathToResource

    if (paramString) {
      url += '?' + paramString
    }

    return url
  }
}
