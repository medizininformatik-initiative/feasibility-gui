import { AppConfigData } from './AppConfigData';
import { AppConfigKey } from './AppConfigKey';

/**
 * Conditional type that maps setting keys to their corresponding value types.
 * Ensures type safety when accessing settings by automatically inferring the correct return type.
 *
 * @template K - The setting key type, must extend AppConfigKey.
 */
export type AppConfigValue<K extends AppConfigKey> = K extends keyof AppConfigData
  ? AppConfigData[K]
  : never;
