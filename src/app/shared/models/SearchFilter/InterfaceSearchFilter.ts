import { SearchTermFilterValues } from 'src/app/model/ElasticSearch/ElasticSearchFilter/SearchTermFilterValues';

export interface SearchFilter {
  filterType: string
  data: SearchTermFilterValues[]
}
