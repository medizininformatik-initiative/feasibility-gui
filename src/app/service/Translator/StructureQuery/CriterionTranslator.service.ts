import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AttributeFilterTranslatorService } from './AttributeFilterTranslator.service';
import { CriteriaProfileData } from 'src/app/model/Interface/CriteriaProfileData';
import { CriteriaProfileProviderService } from '../../Provider/CriteriaProfileProvider.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionMetadataService } from '../../Criterion/CriterionMetadata.service';
import { HashService } from '../../Hash.service';
import { Injectable } from '@angular/core';
import { StructuredQueryCriterionData } from 'src/app/model/Interface/StructuredQueryCriterionData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UiProfileProviderService } from '../../Provider/UiProfileProvider.service';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { v4 as uuidv4 } from 'uuid';

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
    private uiTimeRestrictionFactoryService: UITimeRestrictionFactoryService
  ) {}

  public translate(structuredQueryCriterion: StructuredQueryCriterionData): Criterion {
    const criteriaProfileData = this.getCriteriaProfileData(structuredQueryCriterion);
    const criterionId = uuidv4();
    const criterionBuilder = this.createCriterionBuilder(criteriaProfileData, criterionId);
    this.applyValueFilters(
      criterionBuilder,
      structuredQueryCriterion,
      criteriaProfileData.uiProfileId
    );
    this.applyAttributeFilters(
      criterionBuilder,
      structuredQueryCriterion,
      criteriaProfileData.uiProfileId,
      criterionId
    );
    this.applyTimeRestriction(criterionBuilder, structuredQueryCriterion);
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
    uiProfileId: string
  ): void {
    if (!structuredQueryCriterion.valueFilter) {
      return;
    }
    const uiProfile = this.uiProfileProviderService.getUiProfileById(uiProfileId);
    const valueFilter: ValueFilter = this.attributeFilterTranslatorService.translateValueFilters(
      uiProfile.valueDefinition,
      structuredQueryCriterion.valueFilter
    );
    criterionBuilder.withValueFilters([valueFilter]);
  }

  private applyAttributeFilters(
    criterionBuilder: CriterionBuilder,
    structuredQueryCriterion: StructuredQueryCriterionData,
    uiProfileId: string,
    criterionId: string
  ): void {
    if (!structuredQueryCriterion.attributeFilters) {
      return;
    }
    const attributeDefinitions =
      this.uiProfileProviderService.getUiProfileById(uiProfileId).attributeDefinitions;
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
    structuredQueryCriterion: StructuredQueryCriterionData
  ): void {
    if (!structuredQueryCriterion.timeRestriction) {
      return;
    }

    const timeRestriction =
      this.uiTimeRestrictionFactoryService.createTimeRestrictionForFeasibilityQuery(
        structuredQueryCriterion.timeRestriction
      );

    criterionBuilder.withTimeRestriction(timeRestriction);
  }
}
