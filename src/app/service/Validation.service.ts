import { AnnotatedStructuredQuery } from '../model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { ErrorCodes, SnackbarService } from '../shared/service/Snackbar/Snackbar.service';
import { FeasibilityQueryApiService } from './Backend/Api/FeasibilityQueryApi.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(
    private feasibilityQueryApiService: FeasibilityQueryApiService,
    private snackbar: SnackbarService
  ) {}

  public validateStructuredQuery(
    structuredQuery: StructuredQuery
  ): Observable<AnnotatedStructuredQuery> {
    return this.feasibilityQueryApiService.validateStructuredQuery(structuredQuery).pipe(
      map((annotatedStructuredQuery) => {
        annotatedStructuredQuery.inclusionCriteria.forEach((criterionArray) => {
          criterionArray.forEach((criterion) => {
            if (criterion.issues.length > 0) {
              criterion.issues.forEach((issue) => {
                console.warn(issue);
              });
              this.snackbar.displayErrorMessage(ErrorCodes[criterion.issues[0].code]);
            }
          });
        });
        return annotatedStructuredQuery;
      })
    );
  }
}
