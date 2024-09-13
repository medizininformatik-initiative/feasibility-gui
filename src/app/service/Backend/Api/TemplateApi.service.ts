import { Injectable } from '@angular/core';
import { StructuredQueryInquiry } from 'src/app/model/SavedFeasibilityQuery/SavedAnnotatedFeasibilityQuery';
import { FeatureService } from '../../Feature.service';
import { HttpClient } from '@angular/common/http';
import { NewBackendService } from '../NewBackend.service';
import { TemplatePaths } from '../Paths/TemplatePaths';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateApiService {
  constructor(private backendService: NewBackendService, private http: HttpClient) {}

  public loadTemplate(id: number): Observable<StructuredQueryInquiry> {
    const headers = this.backendService.getHeaders();
    return this.http.get<StructuredQueryInquiry>(
      this.backendService.createUrl(TemplatePaths.TEMPLATE_QUERY_ENDPOINT + '/' + id.toString()),
      { headers }
    );
  }

  public updateTemplate(id: number, updatedObject: object): Observable<any> {
    const headers = this.backendService.getHeaders();
    const requestBody = updatedObject;
    return this.http.put<any>(
      this.backendService.createUrl(TemplatePaths.TEMPLATE_QUERY_ENDPOINT + '/' + id.toString()),
      requestBody,
      {
        headers,
      }
    );
  }

  public deleteSavedTemplate(id: number) {
    const headers = this.backendService.getHeaders();
    const url = this.backendService.createUrl(TemplatePaths.TEMPLATE_QUERY_ENDPOINT + '/' + id);
    return this.http.delete<any>(url, {
      headers,
    });
  }
}
