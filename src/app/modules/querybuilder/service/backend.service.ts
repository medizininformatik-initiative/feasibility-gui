import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TerminologyEntry } from '../model/api/terminology/terminology'
import { AppConfigService } from '../../../config/app-config.service'
import { Observable, of } from 'rxjs'
import { FeatureService } from '../../../service/feature.service'
import { Query } from '../model/api/query/query'
import { QueryResult } from '../model/api/result/QueryResult'

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private static PATH_TERMINOLOGY = 'terminology'
  private static PATH_QUERY = 'query'

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

  public getTerminolgyEntry(id: string): Observable<TerminologyEntry> {
    if (this.feature.mockTerminology()) {
      return of(new TerminologyEntry())
    }

    return this.http.get<TerminologyEntry>(
      this.createUrl(BackendService.PATH_TERMINOLOGY, 'id=' + id)
    )
  }

  public postQuery(query: Query): Observable<string> {
    if (this.feature.mockQuery()) {
      return of(BackendService.MOCK_RESULT_URL)
    }

    return this.http.post<string>(this.createUrl(BackendService.PATH_QUERY), query)
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
