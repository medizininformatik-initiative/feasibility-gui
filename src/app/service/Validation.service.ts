import { Injectable } from '@angular/core';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { Query } from '../model/FeasibilityQuery/Query';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { TerminologyCode } from '../model/terminology/Terminology';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private backendService: BackendService) {}

  public validateStructuredQuery(structuredQuery: StructuredQuery): Observable<TerminologyCode[]> {
    const terminologyCodeArraySubject = new Subject<TerminologyCode[]>();
    this.backendService
      .validateStructuredQuery(structuredQuery)
      .subscribe((validatedResponseWrapper) => {
        terminologyCodeArraySubject.next(validatedResponseWrapper.invalidTerms);
        terminologyCodeArraySubject.complete();
      });
    return terminologyCodeArraySubject.asObservable();
  }
}
