import { CriteriaProfileData } from '../FeasibilityQuery/CriteriaProfileData';
import { SearchTermDetails } from './SearchResult/SearchDetails/SearchTermDetails';

export class Entries {
  searchTermDetails: SearchTermDetails;
  criteriaProfileData: CriteriaProfileData;
  id: string;

  /**
   * Constructs an Entries object.
   *
   * @param searchTermDetails - The details of the search term.
   * @param criteriaProfileData - The criteria profile data.
   * @param id - The identifier for the entry.
   */
  constructor(
    searchTermDetails: SearchTermDetails,
    criteriaProfileData: CriteriaProfileData,
    id: string
  ) {
    this.searchTermDetails = searchTermDetails;
    this.criteriaProfileData = criteriaProfileData;
    this.id = id;
  }

  /**
   * Retrieves the search term details.
   *
   * @returns The search term details.
   */
  getSearchTermDetails(): SearchTermDetails {
    return this.searchTermDetails;
  }

  /**
   * Sets the search term details.
   *
   * @param searchTermDetails - The search term details to set.
   */
  setSearchTermDetails(searchTermDetails: SearchTermDetails): void {
    this.searchTermDetails = searchTermDetails;
  }

  /**
   * Retrieves the criteria profile data.
   *
   * @returns The criteria profile data.
   */
  getCriteriaProfileData(): CriteriaProfileData {
    return this.criteriaProfileData;
  }

  /**
   * Sets the criteria profile data.
   *
   * @param criteriaProfileData - The criteria profile data to set.
   */
  setCriteriaProfileData(criteriaProfileData: CriteriaProfileData): void {
    this.criteriaProfileData = criteriaProfileData;
  }

  /**
   * Retrieves the identifier for the entry.
   *
   * @returns The identifier for the entry.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Sets the identifier for the entry.
   *
   * @param id - The identifier for the entry to set.
   */
  setId(id: string): void {
    this.id = id;
  }
}
