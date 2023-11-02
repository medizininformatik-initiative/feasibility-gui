import { Injectable } from '@angular/core';
import { Criterion } from '../model/query/Criterion/Criterion';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Observable, Subscription, from, map } from 'rxjs';
import { UIProfile } from '../model/terminology/UIProfile';
import {
  AttributeDefinition,
  ValueDefinition,
} from '../model/terminology/AttributeDefinitions/AttributeDefinition';
import { AttributeFilter } from '../model/query/Criterion/AttributeFilter/AttributeFilter';
import {
  AbstractAttributeDefinitions,
  ValueType,
} from '../model/terminology/AttributeDefinitions/AbstractAttributeDefinitions';
import { OperatorOptions } from '../model/query/Criterion/AttributeFilter/AbstractAttributeFilters';

@Injectable({
  providedIn: 'root',
})
export class LoadUIProfileService {
  private criterion: Criterion;
  private backend: BackendService;
  constructor() {}

  public getUIProfile(criterion: Criterion): Observable<UIProfile> {
    this.criterion = criterion;
    const profilesObservable = this.requestUIProfile();
    return profilesObservable;
  }

  private requestUIProfile(): Observable<UIProfile> {
    return this.backend.getTerminologyProfile(this.criterion);
  }

  public getAttributeFilters(attributeDefinitions: AttributeDefinition[]): AttributeFilter[] {
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
    attributeFilter.type = this.setAttributeDefinitionType(attributeDefinition.type);
    return attributeFilter;
  }

  public getValueDefinition(valueDefinition: ValueDefinition): ValueDefinition | undefined {
    if (this.isDefinitionFilterSet(valueDefinition)) {
      return valueDefinition;
    } else {
      return undefined;
    }
  }

  private isDefinitionFilterSet(abstractDefinition: AbstractAttributeDefinitions): boolean {
    if (abstractDefinition !== null && abstractDefinition !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  private setAttributeDefinitionType(type: ValueType): OperatorOptions {
    if (this.isConcept(type)) {
      return OperatorOptions.CONCEPT;
    } else if (this.isRefrence(type)) {
      return OperatorOptions.REFERENCE;
    }
  }

  private isConcept(type: ValueType): boolean {
    return type === ValueType.CONCEPT ? true : false;
  }

  private isRefrence(type: ValueType): boolean {
    return type === ValueType.REFERENCE ? true : false;
  }
}
