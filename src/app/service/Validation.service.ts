import { AnnotatedStructuredQuery } from '../model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private backendService: BackendService) {}

  public validateStructuredQuery(
    structuredQuery: StructuredQuery
  ): Observable<AnnotatedStructuredQuery> {
    return this.backendService.validateStructuredQueryBackend(structuredQuery);
  }
}
