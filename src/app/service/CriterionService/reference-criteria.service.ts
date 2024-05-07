import { Injectable } from '@angular/core';
import { AttributeFilter } from '../../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Query } from '../../model/FeasibilityQuery/Query';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { FilterTypesService } from '../FilterTypes.service';
import { QueryService } from '../QueryService.service';
import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { TerminologyCode } from '../../model/terminology/Terminology';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReferenceCriteriaService {
  private criterionSet: Criterion[] = [];
  private criterion: Criterion = new Criterion();
  private queryServiceSubscription: Subscription;
  constructor(
    private filter: FilterTypesService,
    private queryService: QueryService,
    private backendService: BackendService
  ) {}

  public applyReferencesToCriterion(criterion: Criterion): Criterion {
    this.criterion = criterion;
    this.getAllSelectableReferenceCriterias();
    return this.criterion;
  }

  private getAllSelectableReferenceCriterias() {
    this.queryServiceSubscription = this.queryService.getFeasibilityQuery().subscribe((query) => {
      this.createListOfCriteriaAndHashes(query);
    });
    this.queryServiceSubscription.unsubscribe();
  }

  private createListOfCriteriaAndHashes(query: Query): void {
    this.criterionSet = [];
    const queryCriteriaHashes: Array<string> = [];
    for (const inex of ['inclusion', 'exclusion']) {
      query.groups[0][inex + 'Criteria'].forEach((andGroup) => {
        andGroup.forEach((criterion) => {
          queryCriteriaHashes.push(criterion.criterionHash);
          this.criterionSet.push(criterion);
        });
      });
    }
    this.getRefrenceForAttributeFilter(queryCriteriaHashes);
  }

  private getRefrenceForAttributeFilter(criteriaHashes: Array<string>): void {
    const attributeFilters = this.criterion.attributeFilters;
    attributeFilters.map((attributeFilter) =>
      this.sendRequestForCriteriaSetUrl(attributeFilter, criteriaHashes)
    );
  }

  private sendRequestForCriteriaSetUrl(
    attributeFilter: AttributeFilter,
    criteriaHashes: string[]
  ): void {
    if (this.filter.isReference(attributeFilter.type)) {
      const url = attributeFilter.attributeDefinition.referenceCriteriaSet;
      this.backendService
        .getAllowedReferencedCriteria(url, criteriaHashes)
        .subscribe((referenceCriteriaHashes) => {
          this.compareWithCriterionHashList(referenceCriteriaHashes, attributeFilter);
        });
    }
  }

  private compareWithCriterionHashList(hashList: string[], attributeFilter: AttributeFilter): void {
    attributeFilter.attributeDefinition.selectableConcepts = [];
    hashList.forEach((hash) => {
      console.log('criterionset');
      console.log(this.criterionSet);
      console.log(this.criterion);
      const foundCriterion = this.criterionSet.find((criterion) => criterion.criterionHash === hash);
      if (foundCriterion) {
        if (!this.isCriterionLinked(foundCriterion.uniqueID)) {
          const termCodeUid: TerminologyCode = foundCriterion.termCodes[0];
          termCodeUid.uid = foundCriterion.uniqueID;
          attributeFilter.attributeDefinition.selectableConcepts.push(termCodeUid);
        }
      }
    });
  }
  isCriterionLinked(uid: string): boolean {
    let isLinked = false;
    this.queryService.getFeasibilityQuery().subscribe((query) => {
      for (const inex of ['inclusion', 'exclusion']) {
        query.groups[0][inex + 'Criteria'].forEach((disj) => {
          disj.forEach((conj) => {
            if (conj.linkedCriteria.length > 0) {
              conj.linkedCriteria.forEach((criterion) => {
                if (criterion.uniqueID === uid && conj.uniqueID !== this.criterion.uniqueID) {
                  isLinked = true;
                }
              });
            }
          });
        });
      }
    });
    return isLinked;
  }
}
