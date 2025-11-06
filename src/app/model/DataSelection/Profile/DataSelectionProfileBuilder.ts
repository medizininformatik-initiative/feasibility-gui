import { AbstractProfileFilter } from './Filter/AbstractProfileFilter';
import { DataSelectionProfile } from './DataSelectionProfile';
import { Display } from './Display';
import { ProfileFields } from './Fields/ProfileFields';
import { ProfileReference } from './Reference/ProfileReference';
import { v4 as uuidv4 } from 'uuid';

/**
 * Builder class for creating DataSelectionProfile instances with a fluent interface.
 * Provides validation and flexible construction of profile objects.
 */
export class DataSelectionProfileBuilder {
  private id: string;
  private url: string;
  private display: Display;
  private profileFields: ProfileFields;
  private filters: AbstractProfileFilter[] = [];
  private reference: ProfileReference;
  private label: Display;

  /**
   * Creates a new DataSelectionProfileBuilder instance.
   * @param id - Unique identifier for the profile
   * @param url - URL/resource identifier for the profile
   * @param display - Display information for the profile
   * @param profileFields - Collection of profile fields
   */
  constructor(id: string, url: string, display: Display, profileFields: ProfileFields) {
    this.id = id;
    this.url = url;
    this.display = display;
    this.profileFields = profileFields;
  }

  /**
   * Sets the unique identifier for the profile.
   * @param id - Unique identifier
   * @returns This builder instance for method chaining
   */
  public withId(id: string): this {
    this.id = id;
    return this;
  }

  /**
   * Sets the URL/resource identifier for the profile.
   * @param url - URL identifier
   * @returns This builder instance for method chaining
   */
  public withUrl(url: string): this {
    this.url = url;
    return this;
  }

  /**
   * Sets the display information for the profile.
   * @param display - Display information
   * @returns This builder instance for method chaining
   */
  public withDisplay(display: Display): this {
    this.display = display;
    return this;
  }

  /**
   * Sets the profile fields collection.
   * @param profileFields - Collection of profile fields
   * @returns This builder instance for method chaining
   */
  public withProfileFields(profileFields: ProfileFields): this {
    this.profileFields = profileFields;
    return this;
  }

  /**
   * Sets the filters for the profile.
   * @param filters - Array of profile filters
   * @returns This builder instance for method chaining
   */
  public withFilters(filters: AbstractProfileFilter[]): this {
    this.filters = filters;
    return this;
  }

  /**
   * Sets the reference information for the profile.
   * @param reference - Profile reference information
   * @returns This builder instance for method chaining
   */
  public withReference(reference: ProfileReference): this {
    this.reference = reference;
    return this;
  }

  /**
   * Sets the label for the profile.
   * @param label - Label display information
   * @returns This builder instance for method chaining
   */
  public withLabel(label: Display): this {
    this.label = label;
    return this;
  }

  /**
   * Builds and returns a new DataSelectionProfile instance.
   * Validates that all required fields are set before construction.
   * @returns The constructed profile instance
   * @throws {Error} If required fields are missing
   */
  public build(): DataSelectionProfile {
    this.validateRequiredFields();

    return new DataSelectionProfile(
      this.id,
      this.url,
      this.display,
      this.profileFields,
      this.filters,
      this.reference,
      this.label
    );
  }

  /**
   * Validates that all required fields have been set.
   * @private
   * @throws {Error} If any required field is missing
   */
  private validateRequiredFields(): void {
    if (!this.id) {
      throw new Error('DataSelectionProfile requires an id');
    }
    if (!this.url) {
      throw new Error('DataSelectionProfile requires a url');
    }
    if (!this.display) {
      throw new Error('DataSelectionProfile requires a display');
    }
    if (!this.profileFields) {
      throw new Error('DataSelectionProfile requires profileFields');
    }
  }
}
