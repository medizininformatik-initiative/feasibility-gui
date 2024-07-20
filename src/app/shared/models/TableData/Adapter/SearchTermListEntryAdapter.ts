import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import { TableData } from '../InterfaceTableData';

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
      isCheckboxSelected: false,
      isClickable: true,
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: SearchTermListEntryAdapter.headers, body };
  }
}
