import { TerminologyCode } from '../Terminology/TerminologyCode';

export class ConsentTermCode {
  private static readonly CODE = '2.16.840.1.113883.3.1937.777.24.5.3.8';
  private static readonly DISPLAY_NAME = 'MDAT wissenschaftlich nutzen EU DSGVO NIVEAU';
  private static readonly SYSTEM = 'urn:oid:2.16.840.1.113883.3.1937.777.24.5.3';

  public static getConsentTermCode(): TerminologyCode {
    return new TerminologyCode(
      ConsentTermCode.CODE,
      ConsentTermCode.DISPLAY_NAME,
      ConsentTermCode.SYSTEM
    );
  }
}
