import { Injectable } from '@angular/core';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Observable } from 'rxjs';
import { UIProfile } from '../model/terminology/UIProfile';
import {
  AttributeDefinition,
  ValueDefinition,
} from '../model/terminology/AttributeDefinitions/AttributeDefinition';
import {
  AbstractAttributeDefinitions,
  ValueType,
} from '../model/terminology/AttributeDefinitions/AbstractAttributeDefinitions';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { OperatorOptions } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';

@Injectable({
  providedIn: 'root',
})
export class LoadUIProfileService {
  private backend: BackendService;
  constructor() {}

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

  public setDefinitionType(type: ValueType): OperatorOptions {
    if (this.isConcept(type)) {
      return OperatorOptions.CONCEPT;
    } else if (this.isRefrence(type)) {
      return OperatorOptions.REFERENCE;
    } else {
      return OperatorOptions.QUANTITY_NOT_SET;
    }
  }

  private isConcept(type: ValueType): boolean {
    return type === ValueType.CONCEPT ? true : false;
  }

  private isRefrence(type: ValueType): boolean {
    return type === ValueType.REFERENCE ? true : false;
  }
}
