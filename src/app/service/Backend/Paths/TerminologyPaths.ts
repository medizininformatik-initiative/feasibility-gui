export class TerminologyPaths {
  public static readonly BASE_URL = 'terminology';

  public static readonly CRITERIA_PROFILE_ENDPOINT = `${TerminologyPaths.BASE_URL}/criteria-profile-data?ids=`;
  public static readonly ENTRY_ENDPOINT = `${TerminologyPaths.BASE_URL}/entry`;
  public static readonly SEARCH_ENTRY_ENDPOINT = `${TerminologyPaths.BASE_URL}/entry/search`;
  public static readonly SEARCH_FILTER_ENDPOINT = `${TerminologyPaths.BASE_URL}/search/filter`;
  public static readonly SYSTEMS_ENDPOINT = `${TerminologyPaths.BASE_URL}/systems`;
  public static readonly RELATIONS_ENDPOINT = '/relations';

  public static getBaseUrl() {
    return this.BASE_URL;
  }
}
