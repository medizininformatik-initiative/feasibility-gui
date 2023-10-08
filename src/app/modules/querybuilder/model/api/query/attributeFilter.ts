import { TerminologyCode } from '../terminology/terminology';
import { ValueFilter } from './valueFilter';
import { Criterion } from './criterion';

export class AttributeFilter extends ValueFilter {
  attributeCode: TerminologyCode;
  criteria?: Criterion[];
}
