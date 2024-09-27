import { AbstractProfileFilter } from './AbstractProfileFilter';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class ProfileTokenFilter extends AbstractProfileFilter {
  selectedTokens: TerminologyCode[] = [];
  valueSetUrls: string[];
  protected uiType: DataSelectionUIType = DataSelectionUIType.CODE;

  constructor(
    name: string,
    type: string,
    valueSetUrls: string[],
    selectedTokens: TerminologyCode[]
  ) {
    super(type, name);
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

  public setSelectedToken(selectedToken: TerminologyCode): TerminologyCode[] {
    if (this.selectedTokens.length > 0) {
      const index = this.selectedTokens.findIndex(
        (preSelectedToken) => preSelectedToken.getCode() === selectedToken.getCode()
      );
      if (index !== -1) {
        this.selectedTokens[index] = selectedToken;
      } else {
        this.selectedTokens.push(selectedToken);
      }
    } else {
      this.selectedTokens.push(selectedToken);
    }
    return this.selectedTokens;
  }
}
