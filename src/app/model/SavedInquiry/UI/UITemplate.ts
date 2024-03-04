import { AbstractInquiry } from '../AbstractInquiry';

export class UITemplate extends AbstractInquiry {
  createdBy: string;
  isValid = true;

  constructor(abstractInquiry: AbstractInquiry) {
    super(abstractInquiry);
  }

  public setAttributes(isValid: boolean = true, createdBy: string) {
    this.isValid = isValid;
    this.createdBy = createdBy;
  }
}
