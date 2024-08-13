import { FeasibilityQueryResultDetailstListEntry } from '../../ListEntries/FeasibilityQueryResultDetailstListEntry';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { TableData } from '../InterfaceTableData';
import { v4 as uuidv4 } from 'uuid';

export class FeasibilityQueryResultDetailsListAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['site', 'patient_number'],
  };

  public static adapt(listEntries: FeasibilityQueryResultDetailstListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((entry) => ({
      id: uuidv4(),
      data: [entry.getSiteName(), entry.getNumberOfPatients().toString()],
      hasCheckbox: false,
      isCheckboxSelected: false,
      isClickable: false,
      checkboxColumnIndex: 0,
      originalEntry: entry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: FeasibilityQueryResultDetailsListAdapter.headers, body };
  }
}
