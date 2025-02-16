import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriteriaProfileDataService } from '../../../CriteriaProfileData/CriteriaProfileData.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionBuilderHelperService } from './CriterionBuilderHelper.service';
import { CriterionMetadataService } from '../CriterionMetadata.service';
import { from, map, mergeMap, Observable, toArray } from 'rxjs';
import { Injectable } from '@angular/core';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { StageProviderService } from 'src/app/service/Provider/StageProvider.service';

@Injectable({
  providedIn: 'root',
})
export class NewCreateCriterionService {
  constructor(
    private criterionMetadataService: CriterionMetadataService,
    private criteriaProfileDataService: CriteriaProfileDataService,
    private criterionBuilderHelperService: CriterionBuilderHelperService,
    private stageProviderService: StageProviderService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService
  ) {}

  public createCriteriaFromHashes(hashes: string[]): Observable<Criterion[]> {
    return this.criteriaProfileDataService
      .getCriteriaProfileData(hashes.filter((hash) => hash !== undefined))
      .pipe(
        mergeMap((criteriaProfileDatas) => from(criteriaProfileDatas)),
        map((criteriaProfileData) => this.createCriterionFromProfileData(criteriaProfileData)),
        toArray()
      );
  }

  private createCriterionFromProfileData(criteriaProfileData: CriteriaProfileData): Criterion {
    const mandatoryFields = this.criterionMetadataService.createMandatoryFields(criteriaProfileData);
    const criterionBuilder = new CriterionBuilder(mandatoryFields);

    if (criteriaProfileData.getTimeRestrictionAllowed()) {
      criterionBuilder.withTimeRestriction(criterionBuilder.buildTimeRestriction());
    }
    this.criterionBuilderHelperService.addValueFilters(
      criteriaProfileData.getValueDefinitions(),
      criterionBuilder
    );
    this.criterionBuilderHelperService.addAttributeFilters(
      criteriaProfileData.getAttributeDefinitions(),
      criterionBuilder
    );
    return criterionBuilder.buildCriterion();
  }
}
