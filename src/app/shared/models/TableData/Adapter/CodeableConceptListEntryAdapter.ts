import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { TableData } from '../InterfaceTableData';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { v4 as uuidv4 } from 'uuid';

export class CodeableConceptListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Display', 'Terminology', 'Terminology Code'],
  };

  public static adapt(listEntries: CodeableConceptResultListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((entry) => ({
      id: uuidv4(),
      data: [
        entry.getTerminologyCode().getDisplay(),
        entry.getTerminologyCode().getSystem(),
        entry.getTerminologyCode().getCode(),
      ],
      hasCheckbox: true,
      isCheckboxSelected: entry.getIsSelected(),
      isClickable: false,
      checkboxColumnIndex: 0,
      originalEntry: entry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: CodeableConceptListEntryAdapter.headers, body };
  }
}