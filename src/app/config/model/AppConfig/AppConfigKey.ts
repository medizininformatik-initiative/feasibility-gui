import { AppConfigData } from './AppConfigData';

/**
 * Union type representing all possible setting keys from both DataportalSettings and AppConfigData.
 * Used for type-safe access to configuration values across the application.
 */
export type AppConfigKey = keyof AppConfigData;
