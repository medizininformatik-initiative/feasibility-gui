import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeDefinitionsResultMapper } from './Mapper/AttributeDefinitionsResultMapper';
import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { finalize, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from '../ElasticSearch/SearchTermListItemService.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ValueDefinition } from '../../model/Utilities/AttributeDefinition.ts/ValueDefnition';
import { ValueDefinitionsResultMapper } from './Mapper/ValueDefinitionsResultMapper';

@Injectable({
  providedIn: 'root',
})
export class CriteriaProfileDataService {
  ids: Set<string> = new Set<string>();

  constructor(
    private backend: BackendService,
    private listItemService: SelectedTableItemsService<SearchTermListEntry>
  ) {}

  /**
   * Translate selected list items to CriteriaProfileData objects and return them as an Observable.
   */
  public translateListItemsToCriterions(): Observable<CriteriaProfileData[]> {
    return this.getCriteriaProfileData(this.listItemService.getSelectedIds());
  }

  /**
   * Fetch CriteriaProfileData for the given IDs.
   *
   * @param ids The array of selected IDs.
   * @returns Observable<CriteriaProfileData[]> The observable of criteria profile data array.
   */
  public getCriteriaProfileData(ids: Array<string>): Observable<CriteriaProfileData[]> {
    return this.backend.getCriteriaProfileData(ids).pipe(
      switchMap((responses: any[]) => {
        const criteriaProfileDataArray = responses.map((response) => this.createCriteriaProfileData(response));
        return of(criteriaProfileDataArray);
      }),
      finalize(() => {
        this.ids.clear();
        this.listItemService.clearSelection();
      })
    );
  }

  private createCriteriaProfileData(response: any) {
    const context = this.mapTerminologyCode(response.context);
    const termCodes = response.termCodes.map(this.mapTerminologyCode);
    const id = response.id;
    return new CriteriaProfileData(
      id,
      response.uiProfile.timeRestrictionAllowed,
      this.mapAttributeDefinitions(response.uiProfile),
      context,
      termCodes,
      this.mapValueDefinition(response.uiProfile)
    );
  }

  private mapAttributeDefinitions(uiProfile: any): AttributeDefinitions[] {
    const attributeDefinitionMapper = new AttributeDefinitionsResultMapper();
    return attributeDefinitionMapper.mapAttributeDefinitions(uiProfile.attributeDefinitions);
  }

  private mapValueDefinition(uiProfile: any): ValueDefinition[] {
    const valueDefinitionsResultMapper = new ValueDefinitionsResultMapper();
    return valueDefinitionsResultMapper.mapValueDefinition(uiProfile);
  }

  private mapTerminologyCode(termCode: any): TerminologyCode {
    return new TerminologyCode(termCode.code, termCode.display, termCode.system, termCode.version);
  }
}
