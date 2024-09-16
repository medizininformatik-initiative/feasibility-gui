import { AbstractAttributeDefinition } from './AbstractAttributeDefinition';
import { FilterTypes } from '../FilterTypes';
import { QuantityUnit } from '../../FeasibilityQuery/QuantityUnit';
import { TerminologyCode } from '../../Terminology/TerminologyCode';

export class AttributeDefinitions extends AbstractAttributeDefinition {
  private attributeCode?: TerminologyCode;
  private referencedCriteriaSet?: string;

  constructor(
    name: string,
    type: FilterTypes,
    optional: boolean = false,
    allowedUnits: Array<QuantityUnit> = [],
    attributeCode?: TerminologyCode,
    max?: number,
    min?: number,
    precision: number = 1,
    referenceCriteriaSet?: string,
    referencedValueSet?: string[]
  ) {
    super(name, type, optional, allowedUnits, max, min, precision, referencedValueSet);
    this.attributeCode = attributeCode;
    this.referencedCriteriaSet = referenceCriteriaSet;
  }

  public getAttributeCode(): TerminologyCode | undefined {
    return this.attributeCode;
  }

  public setAttributeCode(attributeCode: TerminologyCode | undefined): void {
    this.attributeCode = attributeCode;
  }

  public getReferenceCriteriaSet(): string {
    return this.referencedCriteriaSet;
  }

  public setReferenceCriteriaSet(referenceCriteriaSet: string | undefined): void {
    this.referencedCriteriaSet = referenceCriteriaSet;
  }
}
