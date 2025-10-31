import { environment } from 'src/environments/environment';

export class AssetsPath {
  private static readonly ASSETS_FOLDER = 'assets';
  public static readonly CONFIG_URL = `${AssetsPath.ASSETS_FOLDER}/config/config.${environment.name}.json`;
  public static readonly SILENT_REFRESH_URL = `${AssetsPath.ASSETS_FOLDER}/silent-refresh.html`;
}
