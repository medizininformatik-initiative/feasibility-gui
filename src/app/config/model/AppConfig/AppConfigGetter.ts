import { AppConfigKey } from './AppConfigKey';

export type AppConfigGetter = {
  [K in AppConfigKey as `get${Capitalize<K>}`]: () => string | number
};
