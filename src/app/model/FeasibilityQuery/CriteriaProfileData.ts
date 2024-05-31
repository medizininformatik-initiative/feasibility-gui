import { TerminologyCode } from '../terminology/Terminology';
import { UIProfile } from '../terminology/UIProfile';

/**
 * Represents criteria profile data.
 */
export class CriteriaProfileData {
  private uiProfile: UIProfile;
  private context: TerminologyCode;
  private termCodes: TerminologyCode[];

  /**
   * Constructs a new CriteriaProfileData object.
   *
   * @param uiProfile - The UI profile.
   * @param context - The terminology context.
   * @param termCodes - The terminology codes.
   */
  constructor(uiProfile: UIProfile, context: TerminologyCode, termCodes: TerminologyCode[]) {
    this.uiProfile = uiProfile;
    this.context = context;
    this.termCodes = termCodes;
  }

  /**
   * Gets the UI profile.
   *
   * @returns The UI profile.
   */
  getUiProfile(): UIProfile {
    return this.uiProfile;
  }

  /**
   * Sets the UI profile.
   *
   * @param uiProfile - The UI profile to set.
   */
  setUiProfile(uiProfile: UIProfile): void {
    this.uiProfile = uiProfile;
  }

  /**
   * Gets the terminology context.
   *
   * @returns The terminology context.
   */
  getContext(): TerminologyCode {
    return this.context;
  }

  /**
   * Sets the terminology context.
   *
   * @param context - The terminology context to set.
   */
  setContext(context: TerminologyCode): void {
    this.context = context;
  }

  /**
   * Gets the terminology codes.
   *
   * @returns The terminology codes.
   */
  getTermCodes(): TerminologyCode[] {
    return this.termCodes;
  }

  /**
   * Sets the terminology codes.
   *
   * @param termCodes - The terminology codes to set.
   */
  setTermCodes(termCodes: TerminologyCode[]): void {
    this.termCodes = termCodes;
  }
}
