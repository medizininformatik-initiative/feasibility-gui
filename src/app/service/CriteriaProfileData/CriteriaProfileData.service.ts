import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeDefinitionsResultMapper } from './Mapper/AttributeDefinitionsResultMapper';
import { CriteriaProfile } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { DisplayDataFactoryService } from '../Factory/DisplayDataFactory.service';
import { finalize, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from '../ElasticSearch/SearchTermListItemService.service';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ValueDefinition } from '../../model/Utilities/AttributeDefinition.ts/ValueDefnition';
import { ValueDefinitionsResultMapper } from './Mapper/ValueDefinitionsResultMapper';
import { TerminologyCodeData } from 'src/app/model/Interface/TerminologyCodeData ';
import { CriteriaProfileData } from 'src/app/model/Interface/CriteriaProfileData';
import { UiProfileData } from 'src/app/model/Interface/UiProfileData';

@Injectable({
  providedIn: 'root',
})
export class CriteriaProfileDataService {
  ids: Set<string> = new Set<string>();

  constructor(
    private terminologyApiService: TerminologyApiService,
    private listItemService: SelectedTableItemsService<SearchTermListEntry>,
    private displayDataFactoryService: DisplayDataFactoryService
  ) {}

  /**
   * Translate selected list items to CriteriaProfileData objects and return them as an Observable.
   */
  public translateListItemsToCriterions(): Observable<CriteriaProfile[]> {
    return this.getCriteriaProfileData(this.listItemService.getSelectedIds());
  }

  /**
   * Fetch CriteriaProfileData for the given IDs.
   *
   * @param ids The array of selected IDs.
   * @returns Observable<CriteriaProfileData[]> The observable of criteria profile data array.
   */
  public getCriteriaProfileData(ids: Array<string>): Observable<CriteriaProfile[]> {
    return this.terminologyApiService.getCriteriaProfileData(ids).pipe(
      mergeMap((responses: CriteriaProfileData[]) => {
        const criteriaProfileDataArray = responses
          .map((response: CriteriaProfileData) => this.createCriteriaProfileData(response))
          .filter((data) => data !== undefined);

        return of(criteriaProfileDataArray);
      }),
      finalize(() => {
        this.ids.clear();
        this.listItemService.clearSelection();
      })
    );
  }

  private createCriteriaProfileData(response: CriteriaProfileData): CriteriaProfile | undefined {
    try {
      if (response.uiProfile) {
        const context = this.mapTerminologyCode(response.context);
        const termCodes = response.termCodes.map(this.mapTerminologyCode);
        const id = response.id;
        const display = response.display;

        return new CriteriaProfile(
          id,
          this.displayDataFactoryService.createDisplayData(display),
          response.uiProfile.timeRestrictionAllowed,
          this.mapAttributeDefinitions(response.uiProfile),
          context,
          termCodes,
          this.mapValueDefinition(response.uiProfile)
        );
      } else {
        const id = response.id ? response.id : 'Unknown ID';
        throw new Error(`No UI Profile was provided for ID: ${id}`);
      }
    } catch (error) {
      console.error('Error creating CriteriaProfileData:', error.message);
      return undefined;
    }
  }

  private mapAttributeDefinitions(uiProfile: UiProfileData): AttributeDefinitions[] {
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
