import { AttributeDefinitions } from 'src/app/model/AttributeDefinitions';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { finalize, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SelectedTableItemsService } from './ElasticSearch/SearchTermListItemService.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

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
        const criteriaProfileDataArray = responses.map((response) => {
          const attributeDefinitions: AttributeDefinitions[] = this.mapAttributeDefinitions(
            response.uiProfile
          );
          if (response.uiProfile.valueDefinition) {
            attributeDefinitions.push(this.mapValueDefinition(response.uiProfile));
          }
          const context = this.mapTerminologyCode(response.context);
          const termCodes = response.termCodes.map(this.mapTerminologyCode);
          const id = response.id;
          return new CriteriaProfileData(
            id,
            response.uiProfile.timeRestrictionAllowed,
            attributeDefinitions,
            context,
            termCodes
          );
        });
        return of(criteriaProfileDataArray);
      }),
      finalize(() => {
        this.ids.clear();
        this.listItemService.clearSelection();
      })
    );
  }

  private mapAttributeDefinitions(uiProfile: any): AttributeDefinitions[] {
    if (!uiProfile.attributeDefinitions || uiProfile.attributeDefinitions.length === 0) {
      return [];
    }
    return uiProfile.attributeDefinitions.map(
      (attributeDefinition) =>
        new AttributeDefinitions(
          uiProfile.name,
          attributeDefinition.type,
          attributeDefinition.optional,
          attributeDefinition.allowedUnits?.map(
            (unit) => new QuantityUnit(unit.code, unit.display, unit.system)
          ) || [],
          false,
          this.createNewTerminologyCode(attributeDefinition.attributeCode),
          attributeDefinition.max,
          attributeDefinition.min,
          attributeDefinition.precision,
          attributeDefinition.referencedCriteriaSet,
          attributeDefinition.referencedValueSet
        )
    );
  }

  private mapValueDefinition(uiProfile: any): AttributeDefinitions {
    return new AttributeDefinitions(
      uiProfile.name,
      uiProfile.valueDefinition.type,
      uiProfile.valueDefinition.optional,
      uiProfile.valueDefinition.allowedUnits?.map(
        (unit) => new QuantityUnit(unit.code, unit.display, unit.system)
      ) || [],
      true,
      undefined,
      uiProfile.valueDefinition.max,
      uiProfile.valueDefinition.min,
      uiProfile.valueDefinition.precision,
      uiProfile.valueDefinition.referencedCriteriaSet,
      uiProfile.valueDefinition.referencedValueSet
    );
  }

  private createNewTerminologyCode(terminologyCode: any): TerminologyCode {
    return new TerminologyCode(
      terminologyCode.code,
      terminologyCode.display,
      terminologyCode.system
    );
  }

  private mapTerminologyCode(termCode: any): TerminologyCode {
    return new TerminologyCode(termCode.code, termCode.display, termCode.system, termCode.version);
  }
}
