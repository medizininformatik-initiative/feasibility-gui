import { CriteriaProfile } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriterionHashService } from '../CriterionHash.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { Injectable } from '@angular/core';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CriterionMetadataService {
  constructor(private criterionHashService: CriterionHashService) {}

  /**
   * Creates the mandatory fields (metadata) for a criterion.
   *
   * @param criteriaProfileData The criteria profile data.
   * @returns An object containing the mandatory fields for the criterion.
   */
  public createMandatoryFields(criteriaProfileData: CriteriaProfile): {
    isReference: false
    context: TerminologyCode
    criterionHash: string
    display: Display
    isInvalid: boolean
    isRequiredFilterSet: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = criteriaProfileData.getContext();
    const termCodes = criteriaProfileData.getTermCodes();
    const display = criteriaProfileData.getDisplay();
    const criterionHash = this.criterionHashService.createHash(context, termCodes[0]);
    const isFilterRequired = !this.setIsRequiredFilterSet(criteriaProfileData);

    return {
      isReference: false,
      context,
      criterionHash,
      display,
      isInvalid: false,
      isRequiredFilterSet: isFilterRequired,
      uniqueID: uuidv4(),
      termCodes,
    };
  }

  private setIsRequiredFilterSet(criteriaProfileData: CriteriaProfile) {
    return (
      criteriaProfileData
        .getAttributeDefinitions()
        .filter((attributeDefinition) => !attributeDefinition.getOptional()).length > 0 ||
      criteriaProfileData
        .getValueDefinitions()
        .filter((valueDefinition) => !valueDefinition.getOptional()).length > 0
    );
  }
}
