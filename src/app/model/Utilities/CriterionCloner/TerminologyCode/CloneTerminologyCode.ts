import { TerminologyCode } from '../../../Terminology/TerminologyCode';

export class CloneTerminologyCode {
  /**
   * Creates a deep copy of a TerminologyCode instance.
   *
   * @param terminologyCode - The TerminologyCode instance to deep copy.
   * @returns A new TerminologyCode instance that is a deep copy of the given instance.
   */
  static deepCopyTerminologyCode(terminologyCode: TerminologyCode): TerminologyCode {
    return new TerminologyCode(
      terminologyCode.getCode(),
      terminologyCode.getDisplay(),
      terminologyCode.getSystem(),
      terminologyCode.getVersion() ?? undefined,
      terminologyCode.getUid() ?? undefined
    );
  }

  static deepCopyTerminologyCodes(terminologyCodes: TerminologyCode[]): TerminologyCode[] {
    return terminologyCodes.map((terminologyCode) => this.deepCopyTerminologyCode(terminologyCode));
  }
}
