import { CriteriaListEntry } from '../../ListEntries/CriteriaListListEntry';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { TableData } from '../InterfaceTableData';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

export class SearchTermListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['NAME', 'AVAILABILITY', 'TERMINOLOGY_CODE', 'TERMCODE', 'CONTEXT'],
  };

  private static changeAvailabilityDisplay(availability: number): string {
    if (availability === 0) {
      return '?';
    }

    return availability.toString();
  }

  public static adapt(listEntries: CriteriaListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((listEntry) => ({
      id: listEntry.getId(),
      data: [
        listEntry.getDisplay(),
        SearchTermListEntryAdapter.changeAvailabilityDisplay(listEntry.getAvailability()),
        TerminologySystemDictionary.getNameByUrl(listEntry.getTerminology()),
        listEntry.getTermcode(),
        listEntry.getContext(),
      ],
      hasCheckbox: true,
      isCheckboxSelected: false,
      isClickable: true,
      isDisabled: listEntry.getSelectable(),
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: SearchTermListEntryAdapter.headers, body };
  }
}
