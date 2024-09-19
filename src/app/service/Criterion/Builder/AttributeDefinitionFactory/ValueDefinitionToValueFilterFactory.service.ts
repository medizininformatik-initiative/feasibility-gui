import { Injectable } from '@angular/core';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { AttributeDefinitionToAttributeFilterBuilderHelperService } from './AttributeDefinitionToAttributeFilterBuilderHelper.service';
import { ValueDefinition } from 'src/app/model/Utilities/AttributeDefinition.ts/ValueDefnition';

@Injectable({
  providedIn: 'root',
})
export class ValueDefinitionToValueFilterFactoryService {
  constructor(
    private factoryHelperService: AttributeDefinitionToAttributeFilterBuilderHelperService
  ) {}

  /**
   * Converts a ValueDefinition to a ValueFilter using the appropriate builder logic.
   *
   * @param valueDefinition The value definition to convert to a filter.
   * @returns The constructed ValueFilter.
   */
  public createValueFilter(valueDefinition: ValueDefinition): ValueFilter {
    const builder = this.factoryHelperService.initializeFilterBuilder(valueDefinition);
    this.factoryHelperService.addFiltersToBuilder(valueDefinition, builder);
    return builder.buildValueFilter();
  }
}
