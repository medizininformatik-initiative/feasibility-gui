import { TerminologyCode } from '../../terminology/Terminology';
import { ConceptFilter } from './ConceptFilter';

export class ConceptAttributeFilter extends ConceptFilter {
  attributeCode: TerminologyCode;
}
