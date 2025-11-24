import { AppConfigGetter } from 'src/app/config/model/AppConfig/AppConfigGetter';
import { DataPortalGetter } from 'src/app/config/model/DataPortalConfig/DataportalConfigGetter';

export type AppSettingGetter = AppConfigGetter & DataPortalGetter;
