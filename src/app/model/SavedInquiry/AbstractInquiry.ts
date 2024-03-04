import { StructuredQuery } from '../StructuredQuery/StructuredQuery';
import { TerminologyCode } from '../terminology/Terminology';

export abstract class AbstractInquiry {
  comment: string;
  content: StructuredQuery;
  id: number;
  invalidTerms: TerminologyCode[] = [];
  label: string;
  lastModified: string;

  constructor(abstractInquiry: AbstractInquiry) {
    this.comment = abstractInquiry.comment;
    this.content = abstractInquiry.content;
    this.id = abstractInquiry.id;
    this.invalidTerms = abstractInquiry.invalidTerms;
    this.label = abstractInquiry.label;
    this.lastModified = abstractInquiry.lastModified;
  }
}
