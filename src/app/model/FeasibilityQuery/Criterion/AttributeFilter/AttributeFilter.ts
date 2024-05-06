import { AttributeDefinition } from 'src/app/model/terminology/AttributeDefinitions/AttributeDefinition';
import { TerminologyCode } from '../../../terminology/Terminology';
import { Criterion } from '../Criterion';
import { AbstractAttributeFilters, QuantityUnit } from './AbstractAttributeFilters';
import { FilterTypes } from 'src/app/model/FilterTypes';

export class AttributeFilter extends AbstractAttributeFilters {
  private attributeCode: TerminologyCode;
  private criteria: Criterion[] = [];
  private attributeDefinition: AttributeDefinition | null = null;

  /**
   * @param attributeCode
   * @param criteria
   * @param attributeDefinition
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
    criteria: Criterion[] = [],
    attributeDefinition: AttributeDefinition | undefined = undefined,
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
    this.attributeCode = attributeCode;
    this.criteria = criteria;
    this.attributeDefinition = attributeDefinition;
  }

  /**
   * Returns the TerminologyCode
   *
   * @returns TerminologyCode
   */
  public getAttributeCode(): TerminologyCode {
    return this.attributeCode;
  }

  /**
   * Set new value for the attributCode
   *
   * @param attributeCode
   */
  public setAttributeCode(attributeCode: TerminologyCode) {
    this.attributeCode = attributeCode;
  }

  /**
   * Returns the criteria Array containing the linked Criteria
   *
   * @returns
   */
  public getCriteria(): Criterion[] {
    return this.criteria;
  }

  /**
   * Sets the criteria Array for the linked Criteria
   *
   * @param criteria
   */
  public setCriteria(criteria: Criterion[]) {
    this.criteria = criteria;
  }

  /**
   * Returns the AttributeDefinition
   *
   * @returns attributeDefinition | null
   */
  public getAttributeDefinition(): AttributeDefinition | null {
    return this.attributeDefinition;
  }

  /**
   * Set new value for the attributeDefinition
   *
   * @param attributeDefinition
   */
  public setAttributeDefinition(attributeDefinition: AttributeDefinition | null) {
    this.attributeDefinition = attributeDefinition;
  }
}
