import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriteriaProfileDataService } from '../../../CriteriaProfileData/CriteriaProfileData.service';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionBuilderHelperService } from './CriterionBuilderHelper.service';
import { CriterionMetadataService } from '../CriterionMetadata.service';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';

@Injectable({
  providedIn: 'root',
})
export class CreateReferenceCriterionService {
  ids: Set<string> = new Set<string>();

  constructor(
    private criterionMetadataService: CriterionMetadataService,
    private criteriaProfileDataService: CriteriaProfileDataService,
    private criterionBuilderHelperService: CriterionBuilderHelperService
  ) {}

  public fetchReferenceCriterions(
    hashes: string[],
    parentId: string
  ): Observable<ReferenceCriterion[]> {
    return this.criteriaProfileDataService
      .getCriteriaProfileData(hashes)
      .pipe(
        switchMap((criteriaProfileDatas: CriteriaProfileData[]) =>
          of(
            criteriaProfileDatas.map((criteriaProfileData) =>
              this.createReferenceCriterionFromProfileData(criteriaProfileData, parentId)
            )
          )
        )
      );
  }

  public createReferenceCriterionFromProfileData(
    criteriaProfileData: CriteriaProfileData,
    parentId: string
  ): ReferenceCriterion {
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
    criterionBuilder.withParentId(parentId);
    const criterion = criterionBuilder.buildReferenceCriterion();

    return criterion;
  }
}
