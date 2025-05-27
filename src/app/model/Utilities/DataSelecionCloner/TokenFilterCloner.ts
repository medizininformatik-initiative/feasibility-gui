import { ProfileTokenFilter } from '../../DataSelection/Profile/Filter/ProfileTokenFilter';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { CloneConcept } from '../CriterionCloner/ValueAttributeFilter/Concept/CloneConcept';

export class TokenFilterCloner {
  /**
   * Clones a ProfileTokenFilter object deeply.
   * @param tokenFilter The ProfileTokenFilter to clone.
   * @returns A deep copy of the ProfileTokenFilter.
   */
  public static deepCopyTokenFilter(tokenFilter: ProfileTokenFilter): ProfileTokenFilter {
    if (!tokenFilter) {
      return undefined; // Handle null or undefined input
    }
    const clonedSelectedTokens = tokenFilter
      .getSelectedTokens()
      .map((token) => CloneConcept.deepCopyConcept(token));
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
