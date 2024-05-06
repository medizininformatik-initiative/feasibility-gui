import { AttributeDefinition } from './AttributeDefinitions/AttributeDefinition';
import { ValueDefinition } from './AttributeDefinitions/ValueDefinitions';

export class UIProfile {
  private attributeDefinitions: AttributeDefinition[] = [];
  private name: string;
  private timeRestrictionAllowed = true;
  private valueDefinition: ValueDefinition | null;

  /**
   * Creates an instance of ExampleClass.
   *
   * @param attributeDefinitions An array of attribute definitions.
   * @param name The name of the example class.
   * @param timeRestrictionAllowed Flag indicating whether time restriction is allowed.
   * @param valueDefinition The value definition associated with the example class.
   */
  constructor(
    attributeDefinitions: AttributeDefinition[] = [],
    name: string,
    timeRestrictionAllowed: boolean = true,
    valueDefinition: ValueDefinition | null = null
  ) {
    this.attributeDefinitions = attributeDefinitions;
    this.name = name;
    this.timeRestrictionAllowed = timeRestrictionAllowed;
    this.valueDefinition = valueDefinition;
  }

  /**
   * Getter for the attributeDefinitions property.
   *
   * @returns An array of attribute definitions.
   */
  public getAttributeDefinitions(): AttributeDefinition[] {
    return this.attributeDefinitions;
  }

  /**
   * Setter for the attributeDefinitions property.
   *
   * @param attributeDefinitions An array of attribute definitions.
   */
  public setAttributeDefinitions(attributeDefinitions: AttributeDefinition[]) {
    this.attributeDefinitions = attributeDefinitions;
  }

  /**
   * Getter for the name property.
   *
   * @returns The name of the example class.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Setter for the name property.
   *
   * @param name The name of the example class.
   */
  public setName(name: string) {
    this.name = name;
  }

  /**
   * Getter for the timeRestrictionAllowed property.
   *
   * @returns Flag indicating whether time restriction is allowed.
   */
  public getTimeRestrictionAllowed(): boolean {
    return this.timeRestrictionAllowed;
  }

  /**
   * Setter for the timeRestrictionAllowed property.
   *
   * @param timeRestrictionAllowed Flag indicating whether time restriction is allowed.
   */
  public setTimeRestrictionAllowed(timeRestrictionAllowed: boolean) {
    this.timeRestrictionAllowed = timeRestrictionAllowed;
  }

  /**
   * Getter for the valueDefinition property.
   *
   * @returns The value definition associated with the example class.
   */
  public getValueDefinition(): ValueDefinition | null {
    return this.valueDefinition;
  }

  /**
   * Setter for the valueDefinition property.
   *
   * @param valueDefinition The value definition associated with the example class.
   */
  public setValueDefinition(valueDefinition: ValueDefinition | null) {
    this.valueDefinition = valueDefinition;
  }
}
