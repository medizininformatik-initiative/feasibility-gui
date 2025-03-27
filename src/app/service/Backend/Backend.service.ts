import { AppConfigService } from 'src/app/config/app-config.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private config: AppConfigService, private authStorage: OAuthStorage) {}
  public static MOCK_RESULT_URL = 'http://localhost:9999/result-of-query/12345';

  private getAccessToken() {
    return this.authStorage.getItem('access_token');
  }

  public getHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.getAccessToken());
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

  public chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  public chunkArrayForStrings(array: string[], maxUrlLength: number = 1900): string[][] {
    const chunks = [[]];
    let i = 0;
    let length = 0;
    array.forEach((url) => {
      if (length + url.length > maxUrlLength) {
        i++;
        chunks.push([]);
        length = 0;
      }
      length += url.length;
      chunks[i].push(url);
    });
    return chunks;
  }
}
