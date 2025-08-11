import { CloneConcept } from '../CriterionCloner/ValueAttributeFilter/Concept/CloneConcept';
import { Concept } from '../../FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { ProfileTokenFilter } from '../../DataSelection/Profile/Filter/ProfileTokenFilter';

export class TokenFilterCloner {
  /**
   * Clones a ProfileTokenFilter object deeply.
   * @param tokenFilter The ProfileTokenFilter to clone.
   * @returns A deep copy of the ProfileTokenFilter.
   */
  public static deepCopyTokenFilter(tokenFilter: ProfileTokenFilter): ProfileTokenFilter {
    if (!tokenFilter) {
      return undefined;
    }
    const clonedSelectedTokens = tokenFilter
      .getSelectedTokens()
      .map((token: Concept) => CloneConcept.deepCopyConcept(token));
    const clonedValueSetUrls = [...(tokenFilter.getValueSetUrls() || [])];
    return new ProfileTokenFilter(
      tokenFilter.getId(),
      tokenFilter.getName(),
      tokenFilter.getType(),
      clonedValueSetUrls,
      clonedSelectedTokens
    );
  }
}
