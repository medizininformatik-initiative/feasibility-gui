import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { SearchTermListEntry } from '../SearchTermListEntry';
import { InterfaceTableDataHeader } from 'src/app/model/TableData/InterfaceTableDataHeader';
import { InterfaceTableDataBody } from 'src/app/model/TableData/InterfaceTableDataBody';

export class SearchTermListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Name', 'ID', 'Availability', 'Terminology', 'Termcode', 'KDS Module'],
  };

  public static adapt(listEntries: SearchTermListEntry[]): TableData {
    const bodyRows: any[][] = [];

    listEntries.forEach((listEntry) => {
      bodyRows.push([
        listEntry.getName(),
        listEntry.getId(),
        listEntry.getAvailability().toString(),
        listEntry.getTerminology(),
        listEntry.getTermcode(),
        listEntry.getKdsModule(),
      ]);
    });

    const body: InterfaceTableDataBody = { rows: bodyRows };

    return { header: SearchTermListEntryAdapter.headers, body };
  }
}
