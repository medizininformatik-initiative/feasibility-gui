import { CriteriaBulkEntry } from 'src/app/model/Search/ListEntries/CriteriaBulkEntry';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { TableData } from '../InterfaceTableData';
import { v4 as uuidv4 } from 'uuid';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

export class CriteriaBulkListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['DISPLAY', 'TERMINOLOGY_CODE', 'TERMCODE'],
  };

  public static adapt(listEntries: CriteriaBulkEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((entry: CriteriaBulkEntry) => ({
        id: uuidv4(),
        data: [
          entry.getDisplay(),
          TerminologySystemDictionary.getNameByUrl(entry.getTerminology()),
          entry.getTermcodes()[0].getCode(),
        ],
        hasCheckbox: true,
        isCheckboxSelected: true,
        isClickable: false,
        isDisabled: true,
        checkboxColumnIndex: 0,
        originalEntry: entry,
      }));

    const body: InterfaceTableDataBody = { rows };

    return { header: CriteriaBulkListEntryAdapter.headers, body };
  }
}
