import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';

export abstract class AbstractAttributeDefinitionsResultMapper {
  /**
   * Maps allowed units to QuantityUnit instances.
   *
   * @param allowedUnits The allowed units array.
   * @returns An array of QuantityUnit instances.
   */
  protected mapAllowedUnits(allowedUnits: any[]): QuantityUnit[] {
    return allowedUnits?.map((unit) => new QuantityUnit(unit.code, unit.display, unit.system)) || [];
  }
}
