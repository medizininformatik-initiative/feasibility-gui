import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryEntry, TerminologyEntry } from '../model/api/terminology/terminology';
import { AppConfigService } from '../../../config/app-config.service';
import { Observable, of } from 'rxjs';
import { FeatureService } from '../../../service/feature.service';
import { MockBackendDataProvider } from './MockBackendDataProvider';
import { ApiTranslator } from '../controller/ApiTranslator';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private config: AppConfigService,
    private feature: FeatureService,
    private http: HttpClient,
    private authStorage: OAuthStorage
  ) {}
  private static PATH_ROOT_ENTRIES = 'terminology/root-entries';
  private static PATH_TERMINOLOGY_SUBTREE = 'terminology/entries';
  private static PATH_TERMINOLOGY_PROFILE = 'terminology/ui_profile';
  private static PATH_SEARCH = 'terminology/selectable-entries';
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

  public getTerminologyProfile(termcode: string): Observable<any> {
    return this.http.get<any>(this.createUrl(BackendService.PATH_TERMINOLOGY_PROFILE, termcode));
  }

  public getTerminolgyEntrySearchResult(
    catId: string,
    search: string
  ): Observable<Array<TerminologyEntry>> {
    if (this.feature.mockTerminology()) {
      return of(this.mockBackendDataProvider.getTerminolgyEntrySearchResult(catId, search));
    }

    const url = this.createUrl(BackendService.PATH_SEARCH);

    return this.http.get<Array<TerminologyEntry>>(url);
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
