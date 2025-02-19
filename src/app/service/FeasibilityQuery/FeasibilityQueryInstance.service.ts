import { ConsentService } from 'src/app/service/Consent/Consent.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class FeasibilityQueryInstanceService {
  constructor(
    private feasibilityQueryService: FeasibilityQueryProviderService,
    private consentService: ConsentService
  ) {}

  public instantiate(): FeasibilityQuery {
    const feasibilityQuery = new FeasibilityQuery(uuidv4());
    this.feasibilityQueryService.setFeasibilityQueryByID(
      feasibilityQuery,
      feasibilityQuery.getId(),
      true
    );
    this.consentService.setConsent(false);
    this.consentService.setProvisionCode(false, false, false, false);
    return feasibilityQuery;
  }
}
