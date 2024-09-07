import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermFilterValues } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilterValues';
import { SearchFilter, SearchFilterValues } from './InterfaceSearchFilter';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';

export class CriteriaSearchFilterAdapter {
  public static convertToFilterValues(filter: SearchTermFilter): SearchFilter {
    const searchFilterValues: SearchFilterValues[] = filter
      .getValues()
      .map((filterValue: SearchTermFilterValues) =>
        this.createSearchFilterValue(filterValue, filter.getName())
      );

    return {
      filterType: filter.getName().toUpperCase(),
      data: searchFilterValues,
    };
  }

  private static createSearchFilterValue(
    filterValue: SearchTermFilterValues,
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