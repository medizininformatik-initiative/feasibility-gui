import { TerminologyCodeData } from './TerminologyCodeData';

export interface FilterData {
  type: 'token' | 'date'
  name: 'code' | 'date'
  codes?: TerminologyCodeData[]
  start?: string
  end?: string
}
