import { SearchTermFilter } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilter';
import { SearchTermFilterValues } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilterValues';
import { SearchFilter } from './InterfaceSearchFilter';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';

export class CrietriaSearchFilterAdapter {
  public static convertToFilterValues(filter: SearchTermFilter): SearchFilter {
    if (filter.getName() === ElasticSearchFilterTypes.TERMINOLOGY) {
      return {
        filterType: filter.getName(),
        data: this.translateLabels(filter.getValues()),
      };
    }
    return {
      filterType: filter.getName(),
      data: filter.getValues(),
    };
  }

  private static translateLabels(filetrValues: SearchTermFilterValues[]): SearchTermFilterValues[] {
    return filetrValues.map((filterValue: SearchTermFilterValues) => {
      const translatedLabel = TerminologySystemDictionary.getNameByUrl(filterValue.getlabel());
      return new SearchTermFilterValues(
        filterValue.getCount(),
        translatedLabel ?? filterValue.getlabel()
      );
    });
  }
}
