import { SearchResult } from './SearchResult';

export interface SearchResponse {
  totalHits: number
  results: SearchResult[]
}
