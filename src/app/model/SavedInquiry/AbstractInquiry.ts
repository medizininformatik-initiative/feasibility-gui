export abstract class AbstractInquiry {
  comment: string;
  id: number;
  isValid: boolean;
  label: string;
  lastModified: string;

  constructor(abstractInquiry: AbstractInquiry) {
    this.comment = abstractInquiry.comment;
    this.id = abstractInquiry.id;
    this.isValid = abstractInquiry.isValid;
    this.label = abstractInquiry.label;
    this.lastModified = abstractInquiry.lastModified;
  }
}
