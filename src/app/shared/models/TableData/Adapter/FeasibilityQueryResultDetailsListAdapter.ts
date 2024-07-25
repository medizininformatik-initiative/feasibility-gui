import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { TableData } from '../InterfaceTableData';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from '../../../../model/Result/QueryResult';
import { QueryResultLine } from '../../../../model/Result/QueryResultLine';
import { FeasibilityQueryResultDetailstListEntry } from '../../ListEntries/FeasibilityQueryResultDetailstListEntry';

export class FeasibilityQueryResultDetailsListAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Standort', 'Patienten'],
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
