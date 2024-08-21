import { AbstractProfileFilter } from './AbstractProfileFilter';
import { CRTDLFilterTypes } from 'src/app/model/Utilities/CRTDLFilterTypes';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class ProfileTokenFilter extends AbstractProfileFilter {
  selectedTokens: TerminologyCode[];
  valueSetUrls: string[];

  constructor(
    name: string,
    ui_type: string,
    valueSetUrls: string[],
    selectedTokens: TerminologyCode[]
  ) {
    super(CRTDLFilterTypes.TOKEN, name, ui_type);
    this.selectedTokens = selectedTokens;
    this.valueSetUrls = valueSetUrls;
  }

  public getValueSetUrls(): string[] {
    return this.valueSetUrls;
  }

  public setValueSetUrls(valueSetUrls: string[]): void {
    this.valueSetUrls = valueSetUrls;
  }

  public getSelectedTokens(): TerminologyCode[] {
    return this.selectedTokens;
  }

  public setSelectedTokens(selectedTokens: TerminologyCode[]) {
    this.selectedTokens = selectedTokens;
  }
}
