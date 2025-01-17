import { AppConfigService } from 'src/app/config/app-config.service';
import { FeatureService } from '../Feature.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private config: AppConfigService,
    private feature: FeatureService,
    private authStorage: OAuthStorage
  ) {}
  public static MOCK_RESULT_URL = 'http://localhost:9999/result-of-query/12345';

  private getAccessToken() {
    return this.authStorage.getItem('access_token');
  }

  public getHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.getAccessToken());
  }

  public getLowerBoundaryPatient() {
    return this.feature.getPatientResultLowerBoundary();
  }

  public createUrl(pathToResource: string, paramString?: string): string {
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

  public obfuscateResult(result: number): string {
    if (result === 0) {
      return '0';
    } else {
      if (result) {
        if (result <= this.getLowerBoundaryPatient()) {
          return '< ' + this.getLowerBoundaryPatient().toString();
        } else {
          return result.toString();
        }
      }
    }
  }

  public chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
