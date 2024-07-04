import { InterfaceTableDataHeader } from 'src/app/model/TableData/InterfaceTableDataHeader';
import { CodeableConceptResultListEntry } from '../CodeableConceptResultListEntry';
import { InterfaceTableDataBody } from 'src/app/model/TableData/InterfaceTableDataBody';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';
import { v4 as uuidv4 } from 'uuid';

export class CodeableConceptLinsEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Terminology Code', 'Display'],
  };

  public static adapt(listEntries: CodeableConceptResultListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((entry) => ({
      id: uuidv4(),
      data: [entry.getTerminologyCode().getCode(), entry.getTerminologyCode().getDisplay()],
      hasCheckbox: true,
      isClickable: false,
      checkboxColumnIndex: 0,
      originalEntry: entry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: CodeableConceptLinsEntryAdapter.headers, body };
  }
}
