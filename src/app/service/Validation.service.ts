import { ActuatorInformationService } from './Actuator/ActuatorInformation.service';
import { ConsentService } from './Consent/Consent.service';
import { ErrorCodes, SnackbarService } from '../shared/service/Snackbar/Snackbar.service';
import { FeasibilityQueryApiService } from './Backend/Api/FeasibilityQueryApi.service';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { ValidationModalService } from './ValidationModal.sevice';
import { TerminologyCodeData } from '../model/Interface/TerminologyCodeData ';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(
    private feasibilityQueryApiService: FeasibilityQueryApiService,
    private snackbar: SnackbarService,
    private consentService: ConsentService,
    private validationModalService: ValidationModalService,
    private actuatorService: ActuatorInformationService
  ) {}

  public validateStructuredQuery(structuredQuery: StructuredQuery): Observable<boolean> {
    const annotatedStructuredQuery$ =
      this.feasibilityQueryApiService.validateStructuredQuery(structuredQuery);
    return this.processAnnotatedStructuredQueryObservable(annotatedStructuredQuery$);
  }

  private processAnnotatedStructuredQueryObservable(
    annotatedStructuredQuery$: Observable<any>
  ): Observable<boolean> {
    return annotatedStructuredQuery$.pipe(
      map((annotatedStructuredQuery) => {
        const hasIssues = this.iterateOverCriterionArray(annotatedStructuredQuery.inclusionCriteria);
        if (hasIssues) {
          this.validationModalService.openDonwloadModal(annotatedStructuredQuery);
        }
        return hasIssues;
      })
    );
  }

  private iterateOverCriterionArray(criterionArray: any): boolean {
    let hasIssues = false;
    criterionArray.forEach((criterions) => {
      hasIssues = this.iterateOverCriteria(criterions);
    });
    return hasIssues;
  }

  private iterateOverCriteria(criterionArray: any): boolean {
    let hasIssues = false;
    criterionArray.forEach((criterion) => {
      const termCode: TerminologyCodeData = criterion.termCodes;
      if (criterion.issues?.length > 0 && !this.isConsent(termCode)) {
        hasIssues = true;
        this.displayError(criterion.issues);
      }
    });
    return hasIssues;
  }

  private displayError(issues: any) {
    issues.forEach((issue) => {
      console.warn(issue);
    });
    this.snackbar.displayErrorMessage(ErrorCodes[issues[0].code]);
  }

  private isConsent(termCode: TerminologyCodeData): boolean {
    return this.consentService.getBooleanFlags(termCode.code) !== null;
  }
}
