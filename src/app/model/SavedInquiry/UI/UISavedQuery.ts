import { AbstractInquiry } from '../AbstractInquiry';

export class UISavedQuery extends AbstractInquiry {
  isValid = true;
  totalNumberOfPatients: number;

  constructor(abstractInquiry: AbstractInquiry) {
    super(abstractInquiry);
  }

  public setAttributes(isValid: boolean = true, totalNumberOfPatients: number) {
    this.isValid = isValid;
    this.totalNumberOfPatients = totalNumberOfPatients;
  }
}
