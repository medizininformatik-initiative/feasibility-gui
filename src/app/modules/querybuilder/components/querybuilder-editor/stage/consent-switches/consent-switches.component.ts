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
  euGdpr = false;
  insuranceDataBoolean = false;
  contact = false;

  provisionCodeDisplay: string;

  constructor(private consentService: ConsentService) {}

  ngOnInit(): void {
    this.getProvisionCode();
  }

  onToggleChange(toggleKey: string): void {
    // Update the appropriate boolean based on the toggleKey
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

    this.getProvisionCode(); // Call the function after toggling
  }

  getProvisionCode(): void {
    const criterion = this.consentService.getProvisionsCode(
      this.distributedAnalysis,
      this.euGdpr,
      this.insuranceDataBoolean,
      this.contact
    );

    if (criterion) {
      this.provisionCodeDisplay = criterion.getTermCodes()[0].getDisplay();
      console.log('Provision criterion:', criterion.getTermCodes()[0]);
    }
  }
}
