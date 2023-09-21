import { TerminologyCode } from '../terminology/terminology';
import { Criterion } from './criterion';
import { ValueFilter } from './valueFilter';

export class AttributeFilter extends ValueFilter {
  attributeCode: TerminologyCode;
  criteria?: Criterion[];
}
