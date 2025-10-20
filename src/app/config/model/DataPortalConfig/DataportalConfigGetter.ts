import type { DataportalConfigKey } from './DataportalConfigKey';

export type DataPortalGetter = {
  [K in DataportalConfigKey as `get${Capitalize<K>}`]: () => string | number
};
