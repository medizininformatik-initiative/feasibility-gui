import { Component, OnInit } from '@angular/core';
import { AnalysisType } from 'src/app/model/Utilities/Consent/AnalysisType';
import { ContactOption } from 'src/app/model/Utilities/Consent/ContactOption';
import { GdprCompliance } from 'src/app/model/Utilities/Consent/GdprCompliance';
import { InsuranceData } from 'src/app/model/Utilities/Consent/InsuranceData';
import { ConsentService } from 'src/app/service/Consent/Consent.service';

@Component({
  selector: 'num-consent-switches',
  templateUrl: './consent-switches.component.html',
  styleUrls: ['./consent-switches.component.scss'],
})
export class ConsentSwitchesComponent implements OnInit {
  analysisType = AnalysisType;

  contactOption = ContactOption;

  gdprCompliance = GdprCompliance;

  insuranceData = InsuranceData;

  distributedAnalysis = false;
  euGdpr = true;
  insuranceDataBoolean = false;
  contact = false;

  provisionCodeDisplay: string;

  consent = true;

  constructor(private consentService: ConsentService) {}

  ngOnInit(): void {
    this.getProvisionCode();
    this.consent = this.consentService.getConsent()
    ;[this.distributedAnalysis, this.euGdpr, this.insuranceDataBoolean, this.contact] =
      this.consentService
        .getConsentLookUpTableKey()
        .split(':')
        .map((v) => v === 'true');
  }

  toggleConsent() {
    this.consent = !this.consent;
    this.consentService.setConsent(this.consent);
  }

  onToggleChange(toggleKey: string): void {
    switch (toggleKey) {
      case 'analysisType':
        this.distributedAnalysis = !this.distributedAnalysis; // Toggle the value
        break;
      case 'gdprCompliance':
        this.euGdpr = !this.euGdpr; // Toggle the value
        break;
      case 'insuranceData':
        this.insuranceDataBoolean = !this.insuranceDataBoolean; // Toggle the value
        break;
      case 'contactOption':
        this.contact = !this.contact; // Toggle the value
        break;
    }
    this.consentService.setProvisionCode(
      this.distributedAnalysis,
      this.euGdpr,
      this.insuranceDataBoolean,
      this.contact
    );
    this.getProvisionCode();
  }

  private getProvisionCode(): void {
    this.provisionCodeDisplay = this.consentService.getConsentTermCode().getDisplay();
  }
}
