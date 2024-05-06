import { ValueDefinition } from 'src/app/model/terminology/AttributeDefinitions/ValueDefinitions';
import { AbstractAttributeFilters, QuantityUnit } from './AbstractAttributeFilters';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';
import { FilterTypes } from 'src/app/model/FilterTypes';

export class ValueFilter extends AbstractAttributeFilters {
  private valueDefinition: ValueDefinition = null;

  constructor(
    valueDefinition: ValueDefinition = null,
    allowedUnits: QuantityUnit[] = [],
    display: string = '',
    max: number | null = null,
    min: number | null = null,
    optional: boolean = false,
    precision: number | null = null,
    selectableConcepts: TerminologyCode[] = [],
    type: FilterTypes | null = null
  ) {
    super(allowedUnits, display, max, min, optional, precision, selectableConcepts, type);
    this.valueDefinition = valueDefinition;
  }

  /**
   * @returns valueDefinition
   */
  public getValueDefinition(): ValueDefinition {
    return this.valueDefinition;
  }

  /**
   * @param valueDefinition
   */
  public setValueDefinition(valueDefinition: ValueDefinition) {
    this.valueDefinition = valueDefinition;
  }
}
