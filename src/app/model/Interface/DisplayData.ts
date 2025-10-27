import { TranslationData } from './TranslationData';

/**
 * Interface representing display information from backend API responses.
 * Contains original text and internationalization data for user interface elements.
 * Used for mapping JSON responses containing multilingual display data to domain models.
 */
export interface DisplayData {
  /**
   * Original text content in the default language
   */
  original: string

  /**
   * Array of translated versions in different languages
   */
  translations: TranslationData[]
}
