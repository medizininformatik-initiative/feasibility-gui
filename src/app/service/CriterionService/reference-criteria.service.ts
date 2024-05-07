import { Injectable } from '@angular/core';
import { AttributeFilter } from '../../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Query } from '../../model/FeasibilityQuery/Query';
import { Criterion } from '../../model/FeasibilityQuery/Criterion/Criterion';
import { FilterTypesService } from '../FilterTypes.service';
import { QueryService } from '../QueryService.service';
import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { TerminologyCode } from '../../model/terminology/Terminology';
import { Subscription } from 'rxjs';
import { CritGroupArranger } from '../../modules/querybuilder/controller/CritGroupArranger';

@Injectable({
  providedIn: 'root',
})
export class ReferenceCriteriaService {
  private criterionSet: Criterion[] = [];
  private criterion: Criterion = new Criterion();
  private querySubscription: Subscription;
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
    this.querySubscription = this.queryService.getFeasibilityQuery().subscribe((query) => {
      this.createListOfCriteriaAndHashes(query);
    });
    this.querySubscription.unsubscribe();
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
    attributeFilters.map((attributeFilter) => {
      this.sendRequestForCriteriaSetUrl(attributeFilter, criteriaHashes);
    });
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
      const foundCriterion: Criterion = this.criterionSet.find(
        (criterion) => criterion.criterionHash === hash
      );
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

  moveReferenceCriteria(query: Query): void {
    for (const inex of ['inclusion', 'exclusion']) {
      let x = 0;
      query.groups[0][inex + 'Criteria'].forEach((disj) => {
        let y = 0;
        disj.forEach((conj) => {
          if (conj.isLinked) {
            query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
              query.groups,
              {
                groupId: conj.position.groupId,
                critType: conj.position.critType,
                column: conj.position.column - y,
                row: conj.position.row - x,
              },
              {
                groupId: conj.position.groupId,
                critType: conj.position.critType,
                column: -1,
                row: -1,
              }
            );
            if (disj.length === 1) {
              x++;
            }
            if (disj.length > 1) {
              y++;
            }
            this.rePosition(query);
          }
        });
      });
    }
    this.queryService.setFeasibilityQuery(query);
  }
  rePosition(query: Query): void {
    for (const inex of ['inclusion', 'exclusion']) {
      query.groups[0][inex + 'Criteria'].forEach((disj, i) => {
        disj.forEach((conj, j) => {
          conj.position.row = i;
          conj.position.column = j;
        });
      });
    }
  }
}
