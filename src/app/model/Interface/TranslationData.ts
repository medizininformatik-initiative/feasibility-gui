/**
 * Interface representing translation data for internationalization from backend API responses.
 * Contains language-specific translations for display elements.
 * Used for mapping JSON responses containing localized text to domain models.
 */
export interface TranslationData {
  /**
   * ISO language code identifying the target language for this translation
   */
  language: string

  /**
   * Translated text content in the specified language
   */
  value: string
}
