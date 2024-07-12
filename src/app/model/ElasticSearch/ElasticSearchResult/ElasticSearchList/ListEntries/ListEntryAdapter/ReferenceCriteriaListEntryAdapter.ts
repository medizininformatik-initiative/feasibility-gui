import { InterfaceTableDataBody } from 'src/app/model/TableData/InterfaceTableDataBody';
import { InterfaceTableDataHeader } from 'src/app/model/TableData/InterfaceTableDataHeader';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { ReferenceCriteriaListEntry } from '../RefrenceCriteriaListEntry';

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
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: ReferenceCriteriaListEntryAdapter.headers, body };
  }
}
