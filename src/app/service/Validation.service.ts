import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { TerminologyCode } from '../model/terminology/Terminology';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private backendService: BackendService) {}

  public validateStructuredQuery(structuredQuery: StructuredQuery): Observable<TerminologyCode[]> {
    const terminologyCodeArraySubject = new Subject<TerminologyCode[]>();
    this.backendService
      .validateStructuredQueryBackend(structuredQuery)
      .subscribe((validatedResponseWrapper) => {
        if (validatedResponseWrapper?.invalidTerms) {
          terminologyCodeArraySubject.next(validatedResponseWrapper.invalidTerms);
        } else {
          terminologyCodeArraySubject.next([]);
        }
        terminologyCodeArraySubject.complete();
      });
    return terminologyCodeArraySubject.asObservable();
  }
}
