import { AbstractAttributeDefinitions } from '../model/terminology/AttributeDefinitions/AbstractAttributeDefinitions';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { FilterTypes } from '../model/FilterTypes';
import { FilterTypesService } from './FilterTypes.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UIProfile } from '../model/terminology/UIProfile';
import {
  AttributeDefinition,
  ValueDefinition,
} from '../model/terminology/AttributeDefinitions/AttributeDefinition';

@Injectable({
  providedIn: 'root',
})
export class LoadUIProfileService {
  constructor(private backend: BackendService, private filter: FilterTypesService) {}

  public getUIProfile(criterionHash: string): Observable<UIProfile> {
    const profilesObservable = this.requestUIProfile(criterionHash);
    return profilesObservable;
  }

  private requestUIProfile(criterionHash: string): Observable<UIProfile> {
    return this.backend.getTerminologyProfile(criterionHash);
  }

  public extractAttributeFilters(attributeDefinitions: AttributeDefinition[]): AttributeFilter[] {
    const attributeFilters = new Array<AttributeFilter>();
    if (attributeDefinitions.length > 0) {
      attributeDefinitions.forEach((attributeDefinition) => {
        attributeFilters.push(this.assignAttributeFilterElements(attributeDefinition));
      });
      return attributeFilters;
    } else {
      return undefined;
    }
  }

  private assignAttributeFilterElements(attributeDefinition: AttributeDefinition): AttributeFilter {
    const attributeFilter = new AttributeFilter();
    attributeFilter.attributeCode = attributeDefinition.attributeCode;
    attributeFilter.attributeDefinition = attributeDefinition;
    attributeFilter.display = attributeDefinition.display;
    attributeFilter.minValue = attributeDefinition.min;
    attributeFilter.maxValue = attributeDefinition.max;
    attributeFilter.precision = attributeDefinition.precision;
    attributeFilter.optional = attributeDefinition.optional;
    attributeFilter.type = this.setDefinitionType(attributeDefinition.type);
    return attributeFilter;
  }

  public extractValueDefinition(valueDefinition: ValueDefinition): ValueDefinition | undefined {
    if (this.definitionIsSet(valueDefinition)) {
      return valueDefinition;
    } else {
      return undefined;
    }
  }

  private definitionIsSet(abstractDefinition: AbstractAttributeDefinitions): boolean {
    if (abstractDefinition !== null && abstractDefinition !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  public setDefinitionType(type: FilterTypes): FilterTypes {
    if (this.filter.isConcept(type)) {
      return FilterTypes.CONCEPT;
    } else if (this.filter.isReference(type)) {
      return FilterTypes.REFERENCE;
    } else {
      return FilterTypes.QUANTITY_NOT_SET;
    }
  }
}
