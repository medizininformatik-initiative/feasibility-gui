import { TerminologyCodeBaseData } from './TerminologyBaseData';

export interface FilterData {
  type: 'token' | 'date'
  name: 'code' | 'date'
  codes?: TerminologyCodeBaseData[]
  start?: string
  end?: string
}
