import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { TableData } from '../InterfaceTableData';
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
      isDisabled: true,
      checkboxColumnIndex: 0,
      originalEntry: entry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: CodeableConceptListEntryAdapter.headers, body };
  }
}
