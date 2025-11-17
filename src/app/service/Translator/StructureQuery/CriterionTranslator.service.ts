import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AttributeFilterTranslatorService } from './AttributeFilterTranslator.service';
import { CriteriaProfileData } from 'src/app/model/Interface/CriteriaProfileData';
import { CriteriaProfileProviderService } from '../../Provider/CriteriaProfileProvider.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionMetadataService } from '../../Criterion/Builder/CriterionMetadata.service';
import { HashService } from '../../Hash.service';
import { Injectable } from '@angular/core';
import { StructuredQueryCriterionData } from 'src/app/model/Interface/StructuredQueryCriterionData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UiProfileProviderService } from '../../Provider/UiProfileProvider.service';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { v4 as uuidv4 } from 'uuid';
import { AttributeDefinitionData } from '../../../model/Interface/AttributeDefinitionData';
import { ValueDefinitionData } from '../../../model/Interface/ValueDefinition';
import { AttributeFilterFactoryService } from '../../Criterion/AttributeFilterFactory.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionTranslatorService {
  constructor(
    private attributeFilterTranslatorService: AttributeFilterTranslatorService,
    private criteriaProfileProviderService: CriteriaProfileProviderService,
    private criterionMetadataService: CriterionMetadataService,
    private hashService: HashService,
    private uiProfileProviderService: UiProfileProviderService,
    private uiTimeRestrictionFactoryService: UITimeRestrictionFactoryService,
    private attributeFilterFactoryService: AttributeFilterFactoryService
  ) {}

  public translate(structuredQueryCriterion: StructuredQueryCriterionData): Criterion {
    const criteriaProfileData = this.getCriteriaProfileData(structuredQueryCriterion);
    const criterionId = uuidv4();
    const criterionBuilder = this.createCriterionBuilder(criteriaProfileData, criterionId);
    const uiProfile = this.uiProfileProviderService.getUiProfileById(
      criteriaProfileData.uiProfileId
    );

    this.applyValueFilters(criterionBuilder, structuredQueryCriterion, uiProfile.valueDefinition);
    this.applyAttributeFilters(
      criterionBuilder,
      structuredQueryCriterion,
      uiProfile.attributeDefinitions,
      criterionId
    );
    this.applyTimeRestriction(
      criterionBuilder,
      structuredQueryCriterion,
      uiProfile.timeRestrictionAllowed
    );
    return criterionBuilder.buildCriterion();
  }

  private getCriteriaProfileData(
    structuredQueryCriterion: StructuredQueryCriterionData
  ): CriteriaProfileData {
    const termCode = TerminologyCode.fromJson(structuredQueryCriterion.termCodes[0]);
    const context = TerminologyCode.fromJson(structuredQueryCriterion.context);
    const hash = this.hashService.createCriterionHash(context, termCode);
    return this.criteriaProfileProviderService.getCriteriaProfileByHash(hash);
  }

  private createCriterionBuilder(
    criteriaProfileData: CriteriaProfileData,
    criterionId: string
  ): CriterionBuilder {
    const criterionMetadata = this.criterionMetadataService.createMandatoryFieldsFromData(
      criteriaProfileData,
      criterionId
    );
    return new CriterionBuilder(criterionMetadata);
  }

  private applyValueFilters(
    criterionBuilder: CriterionBuilder,
    structuredQueryCriterion: StructuredQueryCriterionData,
    valueDefinition: ValueDefinitionData
  ): void {
    if (!valueDefinition) {
      criterionBuilder.withValueFilters([]);
    } else {
      if (!structuredQueryCriterion.valueFilter) {
        criterionBuilder.withValueFilters([
          this.attributeFilterFactoryService.createValueFilter(valueDefinition),
        ]);
        if (!valueDefinition.optional) {
          criterionBuilder.withRequiredFilter(false);
        }
      } else {
        const valueFilter: ValueFilter =
          this.attributeFilterTranslatorService.translateValueFilters(
            valueDefinition,
            structuredQueryCriterion.valueFilter
          );
        criterionBuilder.withValueFilters([valueFilter]);
      }
    }
  }

  private applyAttributeFilters(
    criterionBuilder: CriterionBuilder,
    structuredQueryCriterion: StructuredQueryCriterionData,
    attributeDefinitions: AttributeDefinitionData[],
    criterionId: string
  ): void {
    const attributeFilters: AttributeFilter[] =
      this.attributeFilterTranslatorService.translateAttributeFilters(
        attributeDefinitions,
        structuredQueryCriterion.attributeFilters,
        criterionId
      );
    criterionBuilder.withAttributeFilters(attributeFilters);
  }
  private applyTimeRestriction(
    criterionBuilder: CriterionBuilder,
    structuredQueryCriterion: StructuredQueryCriterionData,
    timeRestrictionAllowed: boolean
  ): void {
    if (!structuredQueryCriterion.timeRestriction) {
      if (timeRestrictionAllowed) {
        criterionBuilder.withTimeRestriction(criterionBuilder.buildEmptyTimeRestriction());
      }
    } else {
      const timeRestriction =
        this.uiTimeRestrictionFactoryService.createTimeRestrictionForFeasibilityQuery(
          structuredQueryCriterion.timeRestriction
        );

      criterionBuilder.withTimeRestriction(timeRestriction);
    }
  }
}
