import { AnnotatedStructuredQuery } from '../model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { SnackbarService } from '../core/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private backendService: BackendService, private snackbar: SnackbarService) {}

  public validateStructuredQuery(
    structuredQuery: StructuredQuery
  ): Observable<AnnotatedStructuredQuery> {
    return this.backendService.validateStructuredQueryBackend(structuredQuery).pipe(
      map((annotatedStructuredQuery) => {
        annotatedStructuredQuery.inclusionCriteria.forEach((criterionArray) => {
          criterionArray.forEach((criterion) => {
            if (criterion.issues.length > 0) {
              criterion.issues.forEach((issue) => {
                console.warn(issue);
              });
              this.snackbar.displayErrorMessage(this.snackbar.errorCodes[criterion.issues[0].code]);
            }
          });
        });
        return annotatedStructuredQuery;
      })
    );
  }
}
