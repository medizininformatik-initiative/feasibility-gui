import { AttributeDefinitionProcessorService } from './AttributeDefinitionProcessor.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriteriaProfileDataService } from '../../CriteriaProfileData.service';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionMetadataService } from './CriterionMetadata.service';
import { Injectable } from '@angular/core';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateReferenceCriterionService {
  ids: Set<string> = new Set<string>();

  constructor(
    private criterionMetadataService: CriterionMetadataService,
    private criteriaProfileDataService: CriteriaProfileDataService,
    private attributeDefinitionProcessorService: AttributeDefinitionProcessorService
  ) {}

  public fetchReferenceCriterions(ids: string[]): Observable<ReferenceCriterion[]> {
    return this.criteriaProfileDataService
      .getCriteriaProfileData(ids)
      .pipe(
        switchMap((criteriaProfileDatas: CriteriaProfileData[]) =>
          of(
            criteriaProfileDatas.map((criteriaProfileData) =>
              this.createCriterionFromProfileData(criteriaProfileData)
            )
          )
        )
      );
  }

  public createCriterionFromProfileData(
    criteriaProfileData: CriteriaProfileData
  ): ReferenceCriterion {
    const mandatoryFields = this.criterionMetadataService.createMandatoryFields(criteriaProfileData);
    const criterionBuilder = new CriterionBuilder(mandatoryFields);

    if (criteriaProfileData.getTimeRestrictionAllowed()) {
      criterionBuilder.withTimeRestriction(criterionBuilder.buildTimeRestriction());
    }

    criterionBuilder.withAttributeFilters(
      this.attributeDefinitionProcessorService.processAttributeFilters(criteriaProfileData)
    );
    criterionBuilder.withValueFilters(
      this.attributeDefinitionProcessorService.processValueFilters(criteriaProfileData)
    );

    const criterion = criterionBuilder.buildReferenceCriterion();
    return criterion;
  }
}
