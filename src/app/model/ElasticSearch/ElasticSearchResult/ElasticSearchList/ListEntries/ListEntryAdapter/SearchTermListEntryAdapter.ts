import { InterfaceTableDataBody } from 'src/app/model/TableData/InterfaceTableDataBody';
import { InterfaceTableDataHeader } from 'src/app/model/TableData/InterfaceTableDataHeader';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';
import { SearchTermListEntry } from '../SearchTermListEntry';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { v4 as uuidv4 } from 'uuid';

export class SearchTermListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Name', 'Availability', 'Terminology', 'Termcode', 'KDS Module'],
  };

  public static adapt(listEntries: SearchTermListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((listEntry) => ({
      id: listEntry.getId(),
      data: [
        listEntry.getName(),
        listEntry.getAvailability().toString(),
        listEntry.getTerminology(),
        listEntry.getTermcode(),
        listEntry.getKdsModule(),
      ],
      hasCheckbox: true,
      isClickable: true,
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: SearchTermListEntryAdapter.headers, body };
  }
}
