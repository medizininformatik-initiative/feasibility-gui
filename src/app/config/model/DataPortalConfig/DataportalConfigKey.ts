import { DataportalConfig } from './DataportalConfig';

/**
 * Union type representing all possible setting keys from both DataportalSettings and AppConfigData.
 * Used for type-safe access to configuration values across the application.
 */
export type DataportalConfigKey = keyof DataportalConfig;
