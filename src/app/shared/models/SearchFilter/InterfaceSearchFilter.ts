export interface SearchFilter {
  filterType: string
  data: SearchFilterValues[]
}

export interface SearchFilterValues {
  count: number
  label: string
  display: string
}
