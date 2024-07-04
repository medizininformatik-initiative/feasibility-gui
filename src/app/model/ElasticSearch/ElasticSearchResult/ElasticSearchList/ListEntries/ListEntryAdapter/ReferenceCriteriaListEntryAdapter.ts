import { InterfaceTableDataBody } from 'src/app/model/TableData/InterfaceTableDataBody';
import { InterfaceTableDataHeader } from 'src/app/model/TableData/InterfaceTableDataHeader';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';
import { SearchTermListEntry } from '../SearchTermListEntry';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { v4 as uuidv4 } from 'uuid';
import { ReferenceCriteriaListEntry } from '../RefrenceCriteriaListEntry';

export class RefrenceCriteriaListEntryAdapter {
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
      isClickable: false,
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: RefrenceCriteriaListEntryAdapter.headers, body };
  }
}
