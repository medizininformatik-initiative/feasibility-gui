import { AbstractConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/AbstractConceptFilter';
import { AbstractProfileFilter } from './AbstractProfileFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { DataSelectionFilterTypes } from 'src/app/model/Utilities/DataSelectionFilterTypes';

export class ProfileCodeFilter extends AbstractProfileFilter {
  selectedTokens: TerminologyCode[] = [];
  valueSetUrls: string[];

  constructor(
    name: string,
    type: string,
    valueSetUrls: string[],
    selectedTokens: TerminologyCode[]
  ) {
    super(type, name, DataSelectionFilterTypes.CODE);
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