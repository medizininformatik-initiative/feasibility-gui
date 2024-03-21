import { StructuredQueryCriterion } from '../StructuredQuery/Criterion/StructuredQueryCriterion';

export abstract class AbstractInquiry {
  comment: string;
  id: number;
  invalidCriteria: StructuredQueryCriterion[] = [];
  label: string;
  lastModified: string;

  constructor(abstractInquiry: AbstractInquiry) {
    this.comment = abstractInquiry.comment;
    this.id = abstractInquiry.id;
    this.invalidCriteria = abstractInquiry.invalidCriteria;
    this.label = abstractInquiry.label;
    this.lastModified = abstractInquiry.lastModified;
  }
}
