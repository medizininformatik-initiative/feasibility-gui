import { AppSettingsProviderService } from '../Config/AppSettingsProvider.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private authStorage: OAuthStorage,
    private appSettingsProvider: AppSettingsProviderService
  ) {}

  private getAccessToken() {
    return this.authStorage.getItem('access_token');
  }

  public getHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.getAccessToken());
  }

  public createUrl(pathToResource: string, paramString?: string): string {
    const apiUrl = this.getBaseUrl() + this.appSettingsProvider.getUiBackendApiPath();
    return this.buildUrl(apiUrl, pathToResource, paramString);
  }

  public getBaseUrl(): string {
    return this.appSettingsProvider.getBackendBaseUrl();
  }

  private buildUrl(base: string, path: string, paramString?: string): string {
    let url = base.endsWith('/') ? base : base + '/';
    url += path;
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
