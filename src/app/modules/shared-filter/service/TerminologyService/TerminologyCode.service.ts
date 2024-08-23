import { Injectable } from '@angular/core';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Injectable({
  providedIn: 'root',
})
export class TerminologyCodeService {
  private terminologyCodesMap: Map<string, TerminologyCode> = new Map();

  constructor() {}

  public addTerminologyCode(terminologyCode: TerminologyCode): void {
    this.terminologyCodesMap.set(terminologyCode.getCode(), terminologyCode);
  }

  public removeTerminologyCode(code: string): void {
    this.terminologyCodesMap.delete(code);
  }

  public getTerminologyCode(code: string): TerminologyCode | undefined {
    return this.terminologyCodesMap.get(code);
  }

  public getAllTerminologyCodes(): TerminologyCode[] {
    return Array.from(this.terminologyCodesMap.values());
  }
}
