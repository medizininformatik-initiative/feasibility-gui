import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { StructuredQueryCriterion } from '../model/StructuredQuery/Criterion/StructuredQueryCriterion';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private backendService: BackendService) {}

  public validateStructuredQuery(
    structuredQuery: StructuredQuery
  ): Observable<StructuredQueryCriterion[]> {
    const invalidCriteriaArraySubject = new Subject<StructuredQueryCriterion[]>();
    this.backendService
      .validateStructuredQueryBackend(structuredQuery)
      .subscribe((validatedResponseInquiry) => {
        if (validatedResponseInquiry?.invalidCriteria) {
          invalidCriteriaArraySubject.next(validatedResponseInquiry.invalidCriteria);
        } else {
          invalidCriteriaArraySubject.next([]);
        }
        invalidCriteriaArraySubject.complete();
      });
    return invalidCriteriaArraySubject.asObservable();
  }
}
