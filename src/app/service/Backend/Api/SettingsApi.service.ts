import { BackendService } from '../Backend.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsPath } from '../Paths/SettingsPath';

@Injectable({
  providedIn: 'root',
})
export class SettingsApiService {
  constructor(private http: HttpClient, private backendService: BackendService) {}

  public getSettings(): Observable<any> {
    return this.http.get<any>('http://localhost:8090' + SettingsPath.SETTINGS_ENDPOINT, {
      headers: this.backendService.getHeaders(),
    });
  }
}
