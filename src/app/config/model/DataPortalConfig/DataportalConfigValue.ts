import { DataportalConfigData } from './DataportalConfig';
import { DataportalConfigKey } from './DataportalConfigKey';

/**
 * Conditional type that maps setting keys to their corresponding value types.
 * Ensures type safety when accessing settings by automatically inferring the correct return type.
 *
 * @template K - The setting key type, must extend DataportalConfigKey
 */
export type DataportalConfigValue<K extends DataportalConfigKey> =
  K extends keyof DataportalConfigData ? DataportalConfigData[K] : never;
