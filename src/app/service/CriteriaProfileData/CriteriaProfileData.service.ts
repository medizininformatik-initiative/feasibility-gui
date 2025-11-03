import { AttributeDefinitions } from 'src/app/model/Utilities/AttributeDefinition.ts/AttributeDefinitions';
import { AttributeDefinitionsResultMapper } from './Mapper/AttributeDefinitionsResultMapper';
import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';
import { CriteriaProfile } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { CriteriaProfileData } from 'src/app/model/Interface/CriteriaProfileData';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { finalize, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectedTableItemsService } from '../SearchTermListItemService.service';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { TerminologyCodeData } from 'src/app/model/Interface/TerminologyCodeData';
import { UiProfileData } from 'src/app/model/Interface/UiProfileData';
import { UiProfileProviderService } from '../Provider/UiProfileProvider.service';
import { ValueDefinition } from '../../model/Utilities/AttributeDefinition.ts/ValueDefnition';
import { ValueDefinitionsResultMapper } from './Mapper/ValueDefinitionsResultMapper';
@Injectable({
  providedIn: 'root',
})
export class CriteriaProfileDataService {
  ids: Set<string> = new Set<string>();

  constructor(
    private terminologyApiService: TerminologyApiService,
    private listItemService: SelectedTableItemsService<CriteriaListEntry>,
    private uiProfileProviderService: UiProfileProviderService
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
      if (response.uiProfileId) {
        const uiProfile = this.uiProfileProviderService.getUiProfileById(response.uiProfileId);
        const context = TerminologyCode.fromJson(response.context);
        const termCodes = this.mapTerminologyCodes(response.termCodes);
        const id = response.id;
        const display = response.display;

        return new CriteriaProfile(
          id,
          Display.fromJson(display),
          uiProfile.timeRestrictionAllowed,
          this.mapAttributeDefinitions(uiProfile),
          context,
          termCodes,
          this.mapValueDefinition(uiProfile)
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

  private mapTerminologyCodes(termCodes: TerminologyCodeData[]): TerminologyCode[] {
    return termCodes.map((termCode) => TerminologyCode.fromJson(termCode));
  }
}
