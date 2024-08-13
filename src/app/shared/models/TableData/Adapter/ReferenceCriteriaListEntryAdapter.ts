import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { ReferenceCriteriaListEntry } from '../../ListEntries/ReferenceCriteriaListEntry';
import { TableData } from '../InterfaceTableData';

export class ReferenceCriteriaListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Name', 'Terminology'],
  };

  public static adapt(listEntries: ReferenceCriteriaListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((listEntry) => ({
      id: listEntry.getId(),
      data: [
        listEntry.getTerminologyCode().getDisplay(),
        listEntry.getTerminologyCode().getSystem(),
      ],
      hasCheckbox: true,
      isCheckboxSelected: false,
      isClickable: false,
      isDisabled: false,
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: ReferenceCriteriaListEntryAdapter.headers, body };
  }
}
