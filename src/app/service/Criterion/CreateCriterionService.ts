import { AbstractCriterion } from 'src/app/model/FeasibilityQuery/Criterion/AbstractCriterion';
import { CriteriaProfileData } from 'src/app/model/Interface/CriteriaProfileData';
import { CriteriaProfileDataService } from '../CriteriaProfileData/CriteriaProfileData.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { CriterionBuilderHelperService } from './CriterionBuilderHelper.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';

@Injectable({
  providedIn: 'root',
})
export class CreateCriterionService {
  constructor(
    private criteriaProfileDataService: CriteriaProfileDataService,
    private criterionBuilderHelperService: CriterionBuilderHelperService
  ) {}

  public createReferenceCriteriaFromHashes(
    hashes: string[],
    parentId: string
  ): Observable<ReferenceCriterion[]> {
    return this.fetchCriteriaProfileDataFromHashes(hashes, parentId) as Observable<
      ReferenceCriterion[]
    >;
  }

  public createCriteriaFromHashes(hashes: string[]): Observable<Criterion[]> {
    return this.fetchCriteriaProfileDataFromHashes(hashes);
  }

  private fetchCriteriaProfileDataFromHashes(
    hashes: string[],
    parentId?: string
  ): Observable<AbstractCriterion[]> {
    const validHashes = this.filterValidHashes(hashes);
    return this.criteriaProfileDataService
      .getCriteriaProfileData(validHashes)
      .pipe(
        map((criteriaProfileDatas: CriteriaProfileData[]) =>
          this.buildCriteriaFromProfileData(criteriaProfileDatas, parentId)
        )
      );
  }

  private filterValidHashes(hashes: string[]): string[] {
    return hashes.filter((hash): hash is string => !!hash);
  }

  private buildCriteriaFromProfileData(
    criteriaProfileDatas: CriteriaProfileData[],
    parentId?: string
  ): AbstractCriterion[] {
    return criteriaProfileDatas.map((criteriaProfileData: CriteriaProfileData) =>
      this.buildSingleCriterion(criteriaProfileData, parentId)
    );
  }

  private buildSingleCriterion(
    criteriaProfileData: CriteriaProfileData,
    parentId?: string
  ): AbstractCriterion {
    const builder =
      this.criterionBuilderHelperService.setBuilderWithCriteriaProfileData(criteriaProfileData);
    return parentId
      ? this.createReferenceCriterion(builder, parentId)
      : this.createCriterion(builder);
  }

  private createCriterion(builder: CriterionBuilder): Criterion {
    return builder.buildCriterion();
  }

  private createReferenceCriterion(
    builder: CriterionBuilder,
    parentId: string
  ): ReferenceCriterion {
    builder.withParentId(parentId);
    return builder.buildReferenceCriterion();
  }
}
