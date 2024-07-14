import { FilterTypes } from './FilterTypes';
import { QuantityUnit } from './FeasibilityQuery/QuantityUnit';
import { TerminologyCode } from './Terminology/TerminologyCode';

export class AttributeDefinitions {
  private allowedUnits: Array<QuantityUnit> = [];
  private attributeCode?: TerminologyCode;
  private max?: number;
  private min?: number;
  private optional = false;
  private precision = 1;
  private type: FilterTypes;
  private referenceCriteriaSet?: string;
  private referencedValueSet?: string;
  private name: string;
  private valueDefinition: boolean;

  /**
   *
   * @param name
   * @param type
   * @param optional
   * @param allowedUnits
   * @param valueDefinition
   * @param attributeCode
   * @param max
   * @param min
   * @param precision
   * @param referenceCriteriaSet
   * @param referencedValueSet
   */
  constructor(
    name: string,
    type: FilterTypes,
    optional: boolean = false,
    allowedUnits: Array<QuantityUnit> = [],
    valueDefinition: boolean,
    attributeCode?: TerminologyCode,
    max?: number,
    min?: number,
    precision: number = 1,
    referenceCriteriaSet?: string,
    referencedValueSet?: string
  ) {
    this.name = name;
    this.type = type;
    this.optional = optional;
    this.allowedUnits = allowedUnits;
    this.attributeCode = attributeCode;
    this.max = max;
    this.min = min;
    this.precision = precision;
    this.referenceCriteriaSet = referenceCriteriaSet;
    this.referencedValueSet = referencedValueSet;
    this.valueDefinition = valueDefinition;
  }

  /**
   * Get the name of the profile
   *
   * @returns The name of the profile
   */
  getName(): string {
    return this.name;
  }

  /**
   * Set the name of the profile
   *
   * @param name - The name of the profile
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the filter type of the profile
   *
   * @returns The filter type of the profile
   */
  getType(): FilterTypes {
    return this.type;
  }

  /**
   * Set the filter type of the profile
   *
   * @param type - The filter type of the profile
   */
  setType(type: FilterTypes): void {
    this.type = type;
  }

  /**
   * Get whether the profile is optional
   *
   * @returns True if the profile is optional, otherwise false
   */
  getOptional(): boolean {
    return this.optional;
  }

  /**
   * Set whether the profile is optional
   *
   * @param optional - True if the profile is optional, otherwise false
   */
  setOptional(optional: boolean): void {
    this.optional = optional;
  }

  /**
   * Get it is a valueDefinition or attributeDefintion
   *
   * @returns True if time restriction is allowed, otherwise false
   */
  getValueDefinition(): boolean {
    return this.valueDefinition;
  }

  /**
   * Set whether time restriction is allowed
   *
   * @param timeRestrictionAllowed - True if time restriction is allowed, otherwise false
   */
  setValueDefinition(valueDefinition: boolean): void {
    this.valueDefinition = valueDefinition;
  }

  /**
   * Get the allowed quantity units
   *
   * @returns The allowed quantity units
   */
  getAllowedUnits(): Array<QuantityUnit> {
    return this.allowedUnits;
  }

  /**
   * Set the allowed quantity units
   *
   * @param allowedUnits - The allowed quantity units
   */
  setAllowedUnits(allowedUnits: Array<QuantityUnit>): void {
    this.allowedUnits = allowedUnits;
  }

  /**
   * Get the attribute code
   *
   * @returns The attribute code
   */
  getAttributeCode(): TerminologyCode | undefined {
    return this.attributeCode;
  }

  /**
   * Set the attribute code
   *
   * @param attributeCode - The attribute code
   */
  setAttributeCode(attributeCode: TerminologyCode | undefined): void {
    this.attributeCode = attributeCode;
  }

  /**
   * Get the maximum value allowed
   *
   * @returns The maximum value allowed
   */
  getMax(): number | undefined {
    return this.max;
  }

  /**
   * Set the maximum value allowed
   *
   * @param max - The maximum value allowed
   */
  setMax(max: number | undefined): void {
    this.max = max;
  }

  /**
   * Get the minimum value allowed
   *
   * @returns The minimum value allowed
   */
  getMin(): number | undefined {
    return this.min;
  }

  /**
   * Set the minimum value allowed
   *
   * @param min - The minimum value allowed
   */
  setMin(min: number | undefined): void {
    this.min = min;
  }

  /**
   * Get the precision for numerical values
   *
   * @returns The precision for numerical values
   */
  getPrecision(): number {
    return this.precision;
  }

  /**
   * Set the precision for numerical values
   *
   * @param precision - The precision for numerical values
   */
  setPrecision(precision: number): void {
    this.precision = precision;
  }

  /**
   * Get the reference criteria set
   *
   * @returns The reference criteria set
   */
  getReferenceCriteriaSet(): string {
    return this.referenceCriteriaSet;
  }

  /**
   * Set the reference criteria set
   *
   * @param referenceCriteriaSet - The reference criteria set
   */
  setReferenceCriteriaSet(referenceCriteriaSet: string | undefined): void {
    this.referenceCriteriaSet = referenceCriteriaSet;
  }

  /**
   * Get the referenced value set
   *
   * @returns The referenced value set
   */
  getReferencedValueSet(): string | undefined {
    return this.referencedValueSet;
  }

  /**
   * Set the referenced value set
   *
   * @param referencedValueSet - The referenced value set
   */
  setReferencedValueSet(referencedValueSet: string | undefined): void {
    this.referencedValueSet = referencedValueSet;
  }
}
