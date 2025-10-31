import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { QuantityUnitData } from 'src/app/model/Interface/Unit';

export abstract class AbstractAttributeDefinitionsResultMapper {
  /**
   * Maps allowed units to QuantityUnit instances.
   *
   * @param allowedUnits The allowed units array.
   * @returns An array of QuantityUnit instances.
   */
  protected mapAllowedUnits(allowedUnits: QuantityUnitData[]): QuantityUnit[] {
    return allowedUnits?.map((unit) => QuantityUnit.fromJson(unit)) || [];
  }
}
