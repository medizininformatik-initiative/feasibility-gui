import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Query } from '../model/FeasibilityQuery/Query';
import { QueryService } from './QueryService.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InclusionExclusionService {
  private inclusionCriterionMap: Map<string, Criterion> = new Map();
  private exclusionCriterionMap: Map<string, Criterion> = new Map();

  constructor(private queryService: QueryService) {
    this.initCriterionMaps();
  }

  /**
   * Initializes the inclusion and exclusion criterion maps based on the current feasibility query.
   */
  private initCriterionMaps() {
    this.queryService
      .getFeasibilityQuery()
      .pipe(take(1))
      .subscribe((feasibilityQuery) => {
        this.inclusionCriterionMap = this.buildCriterionMapFromQuery(feasibilityQuery, 'inclusion');
        this.exclusionCriterionMap = this.buildCriterionMapFromQuery(feasibilityQuery, 'exclusion');
      });
  }

  /**
   * Builds a criterion map from the feasibility query based on the specified type ('inclusion' or 'exclusion').
   *
   * @param feasibilityQuery The current feasibility query
   * @param type The type of criteria ('inclusion' or 'exclusion')
   * @returns Map<string, Criterion> The built criterion map
   */
  private buildCriterionMapFromQuery(
    feasibilityQuery: Query,
    type: 'inclusion' | 'exclusion'
  ): Map<string, Criterion> {
    const criteriaMap = new Map<string, Criterion>();

    feasibilityQuery.groups.forEach((group) => {
      const criteriaArray = type === 'inclusion' ? group.inclusionCriteria : group.exclusionCriteria;
      criteriaArray.forEach((criteriaGroup) => {
        criteriaGroup.forEach((criteria) => {
          if (criteria.uniqueID) {
            criteriaMap.set(criteria.uniqueID, criteria);
          }
        });
      });
    });

    return criteriaMap;
  }

  /**
   * Retrieves the inclusion criterion map.
   *
   * @returns Map<string, Criterion> The inclusion criterion map
   */
  public getInclusionCriterionMap(): Map<string, Criterion> {
    return this.inclusionCriterionMap;
  }

  /**
   * Retrieves the exclusion criterion map.
   *
   * @returns Map<string, Criterion> The exclusion criterion map
   */
  public getExclusionCriterionMap(): Map<string, Criterion> {
    return this.exclusionCriterionMap;
  }

  /**
   * Sets a criterion in the appropriate criterion map (inclusion or exclusion) by its unique ID and type.
   *
   * @param criterion The criterion to set
   * @param type The type of criteria ('inclusion' or 'exclusion')
   */
  public setCriterionByUIDAndType(criterion: Criterion, type: 'inclusion' | 'exclusion') {
    if (type === 'inclusion') {
      this.inclusionCriterionMap.set(criterion.uniqueID, criterion);
    } else {
      this.exclusionCriterionMap.set(criterion.uniqueID, criterion);
    }
    this.updateFeasibilityQuery();
  }

  /**
   * Updates the feasibility query with the current inclusion and exclusion criteria maps.
   */
  private updateFeasibilityQuery() {
    this.queryService
      .getFeasibilityQuery()
      .pipe(take(1))
      .subscribe((feasibilityQuery) => {
        feasibilityQuery.groups.forEach((group) => {
          this.getInclusionCriteria(group.id)
            .pipe(take(1))
            .subscribe((inclusionCriteria) => {
              group.inclusionCriteria = inclusionCriteria;
            });

          this.getExclusionCriteria(group.id)
            .pipe(take(1))
            .subscribe((exclusionCriteria) => {
              group.exclusionCriteria = exclusionCriteria;
            });
        });
        this.queryService.setFeasibilityQuery(feasibilityQuery);
      });
  }

  /**
   * Retrieves inclusion criteria for a specific group from the current feasibility query.
   *
   * @param groupId The ID of the group
   * @returns Observable<Criterion[][]> The observable containing inclusion criteria for the group
   */
  public getInclusionCriteria(groupId: number): Observable<Criterion[][]> {
    return this.queryService
      .getFeasibilityQuery()
      .pipe(map((feasibilityQuery) => feasibilityQuery.groups[groupId]?.inclusionCriteria ?? []));
  }

  /**
   * Retrieves exclusion criteria for a specific group from the current feasibility query.
   *
   * @param groupId The ID of the group
   * @returns Observable<Criterion[][]> The observable containing exclusion criteria for the group
   */
  public getExclusionCriteria(groupId: number): Observable<Criterion[][]> {
    return this.queryService
      .getFeasibilityQuery()
      .pipe(map((feasibilityQuery) => feasibilityQuery.groups[groupId]?.exclusionCriteria ?? []));
  }
}
