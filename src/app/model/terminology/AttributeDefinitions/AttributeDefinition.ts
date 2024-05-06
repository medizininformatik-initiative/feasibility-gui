import { AbstractAttributeDefinitions } from './AbstractAttributeDefinitions';
import { FilterTypes } from '../../FilterTypes';
import { QuantityUnit } from '../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { TerminologyCode } from '../Terminology';

export class AttributeDefinition extends AbstractAttributeDefinitions {
  private attributeCode: TerminologyCode;
  private referenceCriteriaSet: string;

  /**
   * @param attributeCode
   * @param referenceCriteriaSet
   * @param allowedUnits
   * @param display
   * @param max
   * @param min
   * @param optional
   * @param precision
   * @param selectableConcepts
   * @param type
   */
  constructor(
    attributeCode?: TerminologyCode,
    referenceCriteriaSet: string = '',
    allowedUnits: QuantityUnit[] = [],
    display: string = '',
    max: number = null,
    min: number = null,
    optional: boolean = false,
    precision: number = null,
    selectableConcepts: TerminologyCode[] = [],
    type: FilterTypes = null
  ) {
    super(allowedUnits, display, max, min, optional, precision, selectableConcepts, type);
    this.attributeCode = attributeCode;
    this.referenceCriteriaSet = referenceCriteriaSet;
  }

  /**
   * Set the attribute code.
   *
   * @param attributeCode The new attribute code.
   */
  public setAttributeCode(attributeCode: TerminologyCode) {
    this.attributeCode = attributeCode;
  }

  /**
   * Return the value of the attributCode
   *
   * @returns attributeCode
   */
  public getAttributeCode() {
    return this.attributeCode;
  }

  /**
   * Set the reference criteria set.
   *
   * @param referenceCriteriaSet
   */
  public setReferenceCriteriaSet(referenceCriteriaSet: string) {
    this.referenceCriteriaSet = referenceCriteriaSet;
  }

  /**
   * Get the reference criteria set.
   *
   * @returns referenceCriteriaSet
   */
  public getReferenceCriteriaSet(): string {
    return this.referenceCriteriaSet;
  }
}
