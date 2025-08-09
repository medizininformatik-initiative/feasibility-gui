import { InterfaceListEntry } from 'src/app/model/Interface/Search/ListEntryData';
import { DisplayData } from '../DisplayData';
import { TerminologyCodeData } from '../TerminologyCodeData';

export interface ReferenceCriteriaListEntryData extends InterfaceListEntry {
  display: DisplayData
  terminologyCode: TerminologyCodeData
}
