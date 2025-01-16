export class DataSelectionPaths {
  private static readonly BASE_URL = 'dse';
  public static readonly PROFILE_DATA_ENDPOINT = `${DataSelectionPaths.BASE_URL}/profile-data?ids=`;
  public static readonly PROFILE_TREE_ENDPOINT = `${DataSelectionPaths.BASE_URL}/profile-tree`;

  public static getBaseUrl() {
    return this.BASE_URL;
  }
}
