import { TerminologyCode } from '../../../terminology/Terminology';
import { AbstractConceptFilter } from './AbstractConceptFilter';

export class ConceptAttributeFilter extends AbstractConceptFilter {
  attributeCode: TerminologyCode;
}
