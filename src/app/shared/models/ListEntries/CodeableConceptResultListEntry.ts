import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { AbstractListEntry } from './AbstractListEntry';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class CodeableConceptResultListEntry extends AbstractListEntry {
  private isSelected = false;
  private terminologyCode: TerminologyCode;
  private display: DisplayData;

  /**
   * @param terminologyCode
   * @param id
   */
  constructor(
    display: DisplayData,
    terminologyCode: TerminologyCode,
    id: string,
    isSelected: boolean = false
  ) {
    super(id);
    this.display = display;
    this.terminologyCode = terminologyCode;
    this.isSelected = isSelected;
  }

  public getDisplay(): DisplayData {
    return this.display;
  }

  public setDisplay(display: DisplayData): void {
    this.display = display;
  }

  /**
   * @returns
   */
  getIsSelected(): boolean {
    return this.isSelected;
  }

  /**
   * @param isSelected
   */
  setIsSelected(isSelected: boolean) {
    this.isSelected = isSelected;
  }

  /**
   * @returns
   */
  getTerminologyCode(): TerminologyCode {
    return this.terminologyCode;
  }

  /**
   * @param terminologyCode
   */
  setTerminologyCode(terminologyCode: TerminologyCode) {
    this.terminologyCode = terminologyCode;
  }
  getName(): string {
    return this.terminologyCode.getDisplay();
  }
  setName(name: string): void {
    this.terminologyCode.setDisplay(name);
  }
}
