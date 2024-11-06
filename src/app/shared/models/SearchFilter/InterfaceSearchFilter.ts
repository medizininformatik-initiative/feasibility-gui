export interface SearchFilter {
  filterType: string
  selectedValues: string[]
  data: SearchFilterValues[]
}

export interface SearchFilterValues {
  count: number
  label: string
  display: string
}
