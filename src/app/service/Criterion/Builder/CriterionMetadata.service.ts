import { CriteriaProfile } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriteriaProfileData } from 'src/app/model/Interface/CriteriaProfileData';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { HashService } from '../../Hash.service';
import { Injectable } from '@angular/core';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CriterionMetadataService {
  constructor(private hashService: HashService) {}

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
    const criterionHash = this.hashService.createCriterionHash(context, termCodes[0]);
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

  /**
   * Creates the mandatory fields (metadata) for a criterion.
   *
   * @param criteriaProfileData The criteria profile data.
   * @returns An object containing the mandatory fields for the criterion.
   */
  public createMandatoryFieldsFromData(
    criteriaProfileData: CriteriaProfileData,
    criterionId: string
  ): {
    isReference: false
    context: TerminologyCode
    criterionHash: string
    display: Display
    isInvalid: boolean
    isRequiredFilterSet: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = TerminologyCode.fromJson(criteriaProfileData.context);
    const termCodes = criteriaProfileData.termCodes.map(TerminologyCode.fromJson);
    const display = Display.fromJson(criteriaProfileData.display);
    const criterionHash = this.hashService.createCriterionHash(context, termCodes[0]);
    const isFilterRequired = true;

    return {
      isReference: false,
      context,
      criterionHash,
      display,
      isInvalid: false,
      isRequiredFilterSet: isFilterRequired,
      uniqueID: criterionId,
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
