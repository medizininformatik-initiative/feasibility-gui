import type { DataportalConfigKey } from './DataportalConfigKey';

/**
 * Helper type to transform keys into getter method names.
 * Removes "readResult" and "passthrough" prefixes.
 */
type GetterMethodName<K extends string> = K extends `read${infer Rest}`
  ? `get${Rest}`
  : K extends `passthrough${infer Rest}`
  ? `get${Rest}`
  : `get${Capitalize<K>}`;

/**
 * A type that defines getter methods for each key in the DataportalConfigKey type.
 * Each method is named according to the transformation rules:
 * - "readResultXxx" becomes "getResultXxx"
 * - "passthroughXxx" becomes "getXxx"
 * - "xxx" becomes "getXxx"
 * @returns string | number
 */
export type DataPortalGetter = {
  [K in DataportalConfigKey as GetterMethodName<K>]: () => string | number
};
