/*import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { FilterTypes } from '../model/Utilities/FilterTypes';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadAllowedCriteriasService {
  private backendService: BackendService;
  private criterionSet: Array<Criterion> = [];
  private criterion: Criterion = new Criterion();

  constructor() {}

  public getAllowedReferenceCriterias(
    criterion: Criterion,
    criterionSet: Criterion[]
  ): Observable<string[]> {
    this.criterion = criterion;
    this.criterionSet = criterionSet;
    const referenceCriterias = this.requestCriterias();
    return referenceCriterias;
  }

  private requestCriterias(): Observable<string[]> {
    const requestResultObservable = this.sendRequest();
    return requestResultObservable;
  }

  public sendRequest(): Observable<Array<string>> {
    const hashList = this.getContextTermCodeHashes();
    const url = this.getCriteriaSetUrl();
    const response = this.backendService.getAllowedReferencedCriteria(url, hashList);
    this.compareResponse(response);
    return response;
  }

  private getContextTermCodeHashes(): Array<string> {
    return this.criterionSet.map((criterion) => criterion.criterionHash);
  }

  private getCriteriaSetUrl(): string {
    const attributeFilters = this.criterion.attributeFilters;
    const criteriaSetUrl = attributeFilters.map((attributeFilter) =>
      this.criteriaSetUrl(attributeFilter)
    );
    return criteriaSetUrl[0];
  }

  private criteriaSetUrl(filter: AttributeFilter): string {
    const filterType = filter.type;
    if (this.isReference(filterType)) {
      return filter.attributeDefinition.referenceCriteriaSet;
    }
    return;
  }

  private isReference(filterType: FilterTypes): boolean {
    return filterType === FilterTypes.REFERENCE ? true : false;
  }

  public compareResponse(response: Observable<string[]>): Observable<Criterion[]> {
    return response.pipe(map((hashList) => this.compareWithCriterionHashList(hashList)));
  }

  private compareWithCriterionHashList(hashList: Array<string>): Array<Criterion> {
    const filterdCriterions: Array<Criterion> = this.criterionSet.filter((criterion) => {
      hashList.includes(criterion.criterionHash);
    });
    return filterdCriterions;
  }
}
*/
