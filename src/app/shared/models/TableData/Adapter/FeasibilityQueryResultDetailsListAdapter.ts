import { FeasibilityQueryResultDetailstListEntry } from '../../ListEntries/FeasibilityQueryResultDetailstListEntry';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { TableData } from '../InterfaceTableData';
import { v4 as uuidv4 } from 'uuid';

export class FeasibilityQueryResultDetailsListAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['SITE', 'PATIENT_COUNT'],
  };

  public static adapt(listEntries: FeasibilityQueryResultDetailstListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries?.map((entry, index) => ({
      id: uuidv4(),
      data: ['DIZ ' + (index + 1), entry.getNumberOfPatients().toString()],
      hasCheckbox: false,
      isCheckboxSelected: false,
      isClickable: false,
      isDisabled: false,
      checkboxColumnIndex: 0,
      originalEntry: entry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: FeasibilityQueryResultDetailsListAdapter.headers, body };
  }
}
