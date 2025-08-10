import { CriteriaSearchFilter } from 'src/app/model/Search/SearchFilter/CriteriaSearchFilter';
import { CriteriaSearchFilterValue } from 'src/app/model/Search/SearchFilter/CriteriaSearchFilterValue';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { SearchFilter, SearchFilterValues } from './InterfaceSearchFilter';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

export class CriteriaSearchFilterAdapter {
  public static convertToFilterValues(filter: CriteriaSearchFilter): SearchFilter {
    const searchFilterValues: SearchFilterValues[] = filter
      .getValues()
      .map((filterValue: CriteriaSearchFilterValue) =>
        this.createSearchFilterValue(filterValue, filter.getName())
      );

    return {
      filterType: filter.getName(),
      selectedValues: filter.getSelectedValues(),
      data: searchFilterValues,
    };
  }

  private static createSearchFilterValue(
    filterValue: CriteriaSearchFilterValue,
    filterType: ElasticSearchFilterTypes
  ): SearchFilterValues {
    const label = filterValue.getlabel();
    const count = filterValue.getCount();
    const display =
      filterType === ElasticSearchFilterTypes.TERMINOLOGY
        ? TerminologySystemDictionary.getNameByUrl(label) ?? label
        : label;

    return {
      count,
      label,
      display,
    };
  }
}
